# Flow_Sync_Manager

## System Overview

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph LR
    UI["Frontend UI / Polling<br/>Review Entities.json"]
    API["API / Request Validation"]
    SERVICE["Sync Manager / Run Control"]
    STORAGE["Persisted Status / Logs"]
    SCRIPTS["Sync Scripts"]

    UI -->|"GET status / poll<br/>POST start / continue / reset"| API
    API -->|"Run status, script status<br/>Log chunk, cursor, result"| UI
    API -->|"Target + selected scripts<br/>Run ID + phase<br/>Status / reset request"| SERVICE
    SERVICE -->|"Accepted run / status<br/>Failure or blocking reason"| API
    SERVICE -->|"Reserve / update / read run<br/>Lock status access<br/>Append / read / delete logs"| STORAGE
    STORAGE -->|"Run records<br/>Log bytes after cursor"| SERVICE
    SERVICE -->|"Selected scripts + phase<br/>Active target context"| SCRIPTS
    SCRIPTS -->|"Exit code, output<br/>Missing Entities.json warning<br/>Exception"| SERVICE

    classDef blue fill:#00AEEF,stroke:#0077A8,stroke-width:2px,color:#000;
    classDef orange fill:#FF8C24,stroke:#C95F00,stroke-width:2px,color:#000;
    classDef red fill:#FF3B3B,stroke:#B5121B,stroke-width:2px,color:#000;
    classDef yellow fill:#FFE600,stroke:#B8A400,stroke-width:2px,color:#000;
    classDef green fill:#28C76F,stroke:#16864A,stroke-width:2px,color:#000;

    class UI blue;
    class API orange;
    class SERVICE red;
    class STORAGE yellow;
    class SCRIPTS green;
```

## Frontend UI / Polling

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph TD
    DASH["0_M_Dashboard.jsx"]
    MODAL["3_M_Sync_Manager.jsx"]
    ACTIONS["Load / start / continue / reset"]
    POLL["Poll status<br/>run_ID + cursor"]
    UPDATE["Update run / script status<br/>Append logs / advance cursor"]
    ACTIVE{"Run still active?"}
    CANCEL["Cancel polling<br/>Worker continues"]
    REVIEW["Review Entities.json"]
    API["API boundary"]

    DASH -->|"Open"| MODAL
    MODAL --> ACTIONS
    POLL --> ACTIONS
    REVIEW --> ACTIONS
    ACTIONS -->|"GET status<br/>POST start: script IDs<br/>POST continue: run_ID<br/>POST reset"| API
    API -->|"Run / status response"| UPDATE
    UPDATE --> MODAL
    UPDATE -->|"Active"| POLL
    UPDATE --> ACTIVE
    ACTIVE -->|"Yes"| POLL
    ACTIVE -->|"No"| MODAL
    MODAL --> CANCEL
    CANCEL -.->|"Stop timer / request only"| POLL
    MODAL --> REVIEW

    classDef blue fill:#00AEEF,stroke:#0077A8,stroke-width:2px,color:#000;
    classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
    class DASH,MODAL,ACTIONS,POLL,UPDATE,ACTIVE,CANCEL,REVIEW blue;
    class API boundary;
```

## API / Request Validation

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph TD
    UI["Frontend boundary"]
    ROUTES["routes/api.php"]
    REQUESTS["Start / status / continue / reset"]
    VALIDATE["Validate request<br/>Script IDs / run_ID / cursor"]
    TARGET{"Active target selected?"}
    CONTROLLER["M_Sync_Manager_Controller"]
    SERVICE["Sync_Manager_Service"]
    RESPONSE["HTTP response<br/>Run state / logs / errors"]

    UI -->|"HTTP requests"| ROUTES
    ROUTES --> REQUESTS
    REQUESTS --> VALIDATE
    VALIDATE --> TARGET
    TARGET -->|"Yes"| CONTROLLER
    TARGET -->|"No: 422"| RESPONSE
    CONTROLLER -->|"startRun / getCurrentStatus<br/>continueRun / resetFailedRun"| SERVICE
    SERVICE -->|"Accepted run / status<br/>or blocking / failure result"| RESPONSE
    RESPONSE -->|"JSON response"| UI

    classDef orange fill:#FF8C24,stroke:#C95F00,stroke-width:2px,color:#000;
    classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
    class ROUTES,REQUESTS,VALIDATE,TARGET,CONTROLLER,RESPONSE orange;
    class UI,SERVICE boundary;
```

## Sync Manager / Run Reservation

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph TD
API["API boundary"]
REQUESTS["Start / continue / status / reset"]
RESERVE["Reserve run<br/>Initial / awaiting_review continuation"]
LAUNCH["Launch detached worker"]
WORKER["Worker boundary<br/>sync-manager:run {run_ID} {phase}"]
STATUS_RESET["Read / reconcile status<br/>Reset failed run"]
API_RESULT["Accepted run / status<br/>Blocking reason / reset result"]
PERSIST["Persist run state<br/>Manage run logs"]
STORAGE["Storage boundary"]

API -->|"Start: scripts<br/>Continue: run_ID<br/>Status: run_ID + cursor<br/>Reset: failed run"| REQUESTS
REQUESTS -->|"Start / continue"| RESERVE
REQUESTS -->|"Status / reset"| STATUS_RESET
RESERVE -->|"Initial / continue phase"| LAUNCH
LAUNCH --> WORKER
RESERVE --> PERSIST
STATUS_RESET --> PERSIST
PERSIST -->|"Run state / lock / logs<br/>Read by cursor / delete on reset"| STORAGE
STORAGE -->|"Persisted run / log data"| PERSIST
RESERVE --> API_RESULT
STATUS_RESET --> API_RESULT
API_RESULT -->|"Run / status / reset response"| API

classDef red fill:#FF3B3B,stroke:#B5121B,stroke-width:2px,color:#000;
classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
class REQUESTS,RESERVE,LAUNCH,STATUS_RESET,API_RESULT,PERSIST red;
class API,WORKER,STORAGE boundary;
```

## Sync Manager / Worker Execution

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph TD
COMMAND["Worker command<br/>run_ID + phase"]
EXECUTE["executeWorker()<br/>Mark running / select phase scripts"]
RUN["Run selected scripts in order<br/>Windows redirect / Symfony Process"]
RESULT{"Exit code / exception"}
REVIEW{"Initial phase<br/>requires review?"}
OUTCOME["Set awaiting_review / completed<br/>or failed with message"]
STATE["Update run / script status"]
SCRIPTS["Script boundary"]
STORAGE["Status / log boundary"]

COMMAND --> EXECUTE
EXECUTE --> RUN
RUN -->|"Selected script + active target"| SCRIPTS
SCRIPTS -->|"Output + exit code"| RESULT
RESULT -->|"Success: next script"| RUN
RESULT -->|"Error / non-zero"| OUTCOME
RUN -->|"All scripts finished"| REVIEW
REVIEW -->|"Yes / no"| OUTCOME
EXECUTE --> STATE
OUTCOME --> STATE
STATE -->|"Run state / script state / output"| STORAGE

classDef red fill:#FF3B3B,stroke:#B5121B,stroke-width:2px,color:#000;
classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
class EXECUTE,RUN,RESULT,REVIEW,OUTCOME,STATE red;
class COMMAND,SCRIPTS,STORAGE boundary;
```

## Persisted Status / Logs

```mermaid
%%{init: {"flowchart": {"wrappingWidth": 280}}}%%
graph TD
    SERVICE["Sync Manager boundary"]
    ACCESS["Storage access"]
    LOCK["sync_status.lock<br/>Serialize status access"]
    STATUS["sync_status.json<br/>Run records keyed by target<br/>Fallback: legacy status.json"]
    LOGS["logs/{run_ID}.log<br/>Per-run output"]

    SERVICE -->|"Lock status access<br/>Read / write / reconcile run records<br/>Append / read logs by cursor<br/>Delete reset / unused logs"| ACCESS
    ACCESS --> LOCK
    ACCESS --> STATUS
    ACCESS --> LOGS
    STATUS --> ACCESS
    LOGS --> ACCESS
    ACCESS -->|"Run state / log chunk"| SERVICE

    classDef yellow fill:#FFE600,stroke:#B8A400,stroke-width:2px,color:#000;
    classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
    class LOCK,STATUS,LOGS yellow;
    class SERVICE boundary;
```

## Sync Scripts

```mermaid
graph TD
    SERVICE["Sync Manager boundary"]
    SELECTED["Selected script IDs<br/>initial / continue phase<br/>active target context"]
    SCRIPT_FILES["<div style='width: 520px; white-space: nowrap'>Scripts in configured order<br/>json_to_php: 2_M_Sync_JSON.php<br/>php_to_json: 1_M_Sync.php<br/>migration: 0_Runner_run.php<br/>generators: 3_EntityGenerator.php</div>"]
    RESULT["Return output / exit code<br/>Missing Entities.json warning"]

    SERVICE -->|"Selected IDs + phase + target"| SELECTED
    SELECTED --> SCRIPT_FILES
    SCRIPT_FILES --> RESULT
    RESULT -->|"Output / result"| SERVICE

    classDef green fill:#28C76F,stroke:#16864A,stroke-width:2px,color:#000;
    classDef boundary fill:#F2F2F2,stroke:#555,stroke-width:2px,color:#000;
    class SELECTED,SCRIPT_FILES,RESULT green;
    class SERVICE boundary;
```
