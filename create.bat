set /p name=name:
if not defined name (pause&exit)
python bin/lime.py create created/%name%