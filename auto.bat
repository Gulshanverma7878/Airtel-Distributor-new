@echo off

REM Navigate to the repo folder
cd "C:\Users\MOHIT\Desktop\Airtel Distributor new"

REM Append current date and time to file.txt (or create it if it doesn't exist)
echo Update Code test on  %date% %time% >> file.txt

REM Add all changes
git add .

REM Commit with a message that includes the current date
git commit -m "Automated commit - %date%"

REM Push the changes to the GitHub repository (main branch)
git push origin main
