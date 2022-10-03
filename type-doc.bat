@echo off
set /p watch=Watch mode? [1 ^| 0]^>^> 
cls
set command=npx typedoc --options ./type-doc.config.json
if %watch%==1 (
   call %command% -watch
) else call %command%
exit