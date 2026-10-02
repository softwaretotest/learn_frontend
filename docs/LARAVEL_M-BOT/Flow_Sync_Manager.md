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

## Diagram Details

### Frontend UI / Polling

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Opens the Sync Manager, starts or continues runs, reviews run status, and displays logs.

**Example:** `run_ID + cursor` → request new log bytes → append logs and advance the cursor.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>

### API / Request Validation

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Validates requests and active target, then returns Sync Manager results through HTTP.

**Example:** `scripts: ["json_to_php"]` → validate ID → `startRun()` → JSON response.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>

### Sync Manager / Run Reservation

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Reserves a target run, persists its state, and launches the detached worker.

**Example:** `target + script IDs` → `run_ID + initial phase` → worker command.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>

### Sync Manager / Worker Execution

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Executes the scripts for a phase and records each result.

**Example:** `initial_scripts` → `running` → `awaiting_review`, `completed`, or `failed`.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>

### Persisted Status / Logs

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Stores shared run state and private per-run output for workers and API requests.

**Example:** `sync_status.json` → run state; `logs/{run_ID}.log` → bytes after `cursor`; `sync_status.lock` → serialized status access.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>

### Sync Scripts

<div className="sync-manager-flow-section">
<div className="sync-manager-flow-description">

**Responsibility:** Maps selected script IDs and phase to the configured PHP scripts.

**Example:** `json_to_php` → `2_M_Sync_JSON.php`; worker receives script output and exit code.

</div>
<div className="sync-manager-flow-diagram">

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

</div>
</div>
