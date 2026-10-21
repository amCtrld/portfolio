'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';


const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  edgeColor = '#ef4444',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.54,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  swipe = true,
  swipeThreshold = 40,
  edgeMax = 32,
  edgeResistance = 0.35,
  className = ''
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const glowStartRef = useRef(null);
  const glowEndRef = useRef(null);
  const swipedRef = useRef(false);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  // Latest active index for the touch handlers (avoids re-binding listeners on every change)
  const activeRef = useRef(active);
  activeRef.current = active;

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  // ---- Touch swipe + edge bounce (horizontal galleries only) ----
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !swipe || vertical) return;

    let startX = 0;
    let startY = 0;
    let pointerId = null;
    let locked = false; // true once we've decided this gesture is a horizontal swipe
    let dxLast = 0;

    const glowFor = dx => (dx > 0 ? glowStartRef.current : glowEndRef.current);

    const springBack = () => {
      const dur = prefersReduced ? 0 : 0.7;
      gsap.to(el, { x: 0, duration: dur, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
      gsap.to([glowStartRef.current, glowEndRef.current], {
        opacity: 0,
        duration: prefersReduced ? 0 : 0.45,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onDown = e => {
      if (e.pointerType !== 'touch') return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      dxLast = 0;
      locked = false;
      swipedRef.current = false;
      gsap.killTweensOf(el);
    };

    const onMove = e => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!locked) {
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
        locked = true;
      }

      dxLast = dx;
      const i = activeRef.current;
      const atStartEdge = i === 0 && dx > 0; // swiping right on the first photo
      const atEndEdge = i === count - 1 && dx < 0; // swiping left on the last photo

      if (atStartEdge || atEndEdge) {
        const pull = Math.min(edgeMax, Math.abs(dx) * edgeResistance);
        const offset = Math.sign(dx) * pull;
        const intensity = pull / edgeMax;
        gsap.set(el, { x: offset });
        gsap.set(glowFor(dx), { opacity: intensity });
        gsap.set(atStartEdge ? glowEndRef.current : glowStartRef.current, { opacity: 0 });
      }
    };

    const onUp = e => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (!locked) return;
      locked = false;

      swipedRef.current = true;
      setTimeout(() => (swipedRef.current = false), 350);

      const i = activeRef.current;
      const dx = dxLast;

      if (Math.abs(dx) >= swipeThreshold) {
        if (dx < 0 && i < count - 1) setActive(i + 1);
        else if (dx > 0 && i > 0) setActive(i - 1);
      }
      springBack();
    };

    const onCancel = e => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      locked = false;
      springBack();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0 });
    };
  }, [swipe, vertical, count, swipeThreshold, edgeMax, edgeResistance, prefersReduced]);

  const handleEnter = i => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (swipedRef.current || i !== active) {
      e.preventDefault();
      if (!swipedRef.current) setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${swipe && !vertical ? ' accordion-gallery--swipe' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-edge': edgeColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={el => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => (mediaRefs.current[i] = el)}>
                <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={el => (barRefs.current[i] = el)} />
                <span className="ag-panel__text" ref={el => (textRefs.current[i] = el)}>
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
      {swipe && !vertical && (
        <>
          <span className="ag-edge ag-edge--start" ref={glowStartRef} aria-hidden="true" />
          <span className="ag-edge ag-edge--end" ref={glowEndRef} aria-hidden="true" />
        </>
      )}
    </div>
  );
};

export default AccordionGallery;