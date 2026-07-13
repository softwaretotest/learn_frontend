# Flow Flow_JSON_Content_SELF-UPDATE

```text
1. User Action: UI update -> M_value change

2. DataProvider Detection: useEffect watches M_value

3. Data Fetching: API call to Backend

4. Synchronization: Update GLOBAL_METADATA -> Set hasJSON_Change(true)

5. JSON_Content Response: Detect change -> Access updated GLOBAL_METADATA
```
