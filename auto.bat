@echo off

REM Navigate to the repo folder
cd "C:\Users\MOHIT\Desktop\Airtel Distributor new"

REM Add all changes
git add .

REM Commit with a message that includes the current date
git commit -m "Automated commit - %date%"

REM Push the changes to the GitHub repository (main branch)
git push origin main
