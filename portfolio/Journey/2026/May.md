# BowlRMS Breaks

The codebase worked beautifully and failed economically. A hard, expensive lesson in one hour of testing.

## Company Development
- **Firebase Quota Shock**: BowlRMS broke under its own architecture. The codebase relied heavily on onSnapshot listeners, which were great functionally but unfeasible economically. One hour of testing consumed the Firebase quota of 50,000 reads/writes.
- **Facing the Codebase**: Started exploring how to fix it across 1,500+ files. There were a lot of bad practices in there, but also a clear trail of how much I had kept learning and improving.

## Personal Development
- **Learning the Expensive Way**: Watching the quota evaporate in real time was humbling. No tutorial sticks like a bill you cannot afford.

## The Lessons
- **Functionality vs Economics**: A feature that works but bankrupts you does not work. Balance real-time convenience against read/write cost from day one.
- **Tech Debt Is a Teacher**: 1,500 files of old decisions felt overwhelming, but each bad practice marked something I now knew how to do better.
