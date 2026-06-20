# BASH CMD

## List all installed Extensions

```bash
ls ~/.vscode/extensions
```

## Error GIT

## CRLF

```bash
warning: in the working copy of '...', CRLF will be replaced by LF the next time Git touches it

git config core.autocrlf true
```

## Folder Structure

```powershell
Get-ChildItem -Recurse -Depth 2 | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' -and $_.FullName -notmatch '\\vendor\\' } | Select-Object -ExpandProperty FullName
```
