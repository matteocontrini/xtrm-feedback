@echo off

if /i "%processor_architecture%"=="x86" (
	start node32 server.js
) else (
	start node64 server.js
)