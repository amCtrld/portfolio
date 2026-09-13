# Procedures

Charts of Accounts exposed data gaps, so BowlRMS had to grow up. Menus, recipes, inventory, and finances finally had to speak one language.

## Company Development
- **Data Model Rework**: Quickly, or slowly, found out that Charts of Accounts had data gaps. BowlRMS had to change its data models and flows. Now menus use recipes, recipes consume inventory, inventory affects finances, and staff wages, recurring bills, and all transactions must report to Charts of Accounts.
- **Performance With Manners**: Rebuilt all of this while keeping the system fast, responsive, and robust. And of course, accessing the database with manners, fewer listeners, cleaner queries, deliberate reads and writes.

## Personal Development
- **Slowing Down to Connect Dots**: August forced systems thinking over speed. Every shortcut now had a downstream cost in accounting.

## The Lessons
- **Everything Rolls Up**: Menus, inventory, wages, and bills are not separate features. If they do not reconcile, the business cannot trust the system.
- **Life Is All About Procedures**: In code and in life, manners and procedures scale. Access the database with manners, and life with the same care.
