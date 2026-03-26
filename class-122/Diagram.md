👤 USER
   │
   │  Input Message:
   │  "Hi"
   ▼
┌──────────────────────────────┐
│        FRONTEND (UI)         │
│  (Mobile / Web Interface)    │
└──────────────────────────────┘
   │
   │  API Request (JSON)
   ▼
┌──────────────────────────────┐
│        BACKEND SERVER        │
│  - Receives request          │
│  - Manages session           │
│  - Prepares prompt           │
└──────────────────────────────┘
   │
   │  Send structured data
   ▼
┌──────────────────────────────┐
│        LANGCHAIN LAYER       │
│  - Orchestration             │
│  - Tool selection            │
│  - Prompt formatting         │
└──────────────────────────────┘
   │
   │  Calls AI + Tools
   ▼
┌────────────────────────────────────────────┐
│                AI SYSTEM                   │
│ ┌──────────────┐  ┌──────────────┐         │
│ │   LLM Model  │  │    Tools     │         │
│ │ (Chat AI)    │  │ (Search, DB) │         │
│ └──────────────┘  └──────────────┘         │
│        │                 │                 │
│        └───────┬─────────┘                 │
│                ▼                           │
│        Generate Response                  │
│   "Hello, how can I help you today?"      │
└────────────────────────────────────────────┘
   │
   │  Response Output
   ▼
┌──────────────────────────────┐
│        LANGCHAIN LAYER       │
│  - Post-processing           │
│  - Formatting                │
└──────────────────────────────┘
   │
   │
   ▼
┌──────────────────────────────┐
│        BACKEND SERVER        │
│  - Logs conversation         │
│  - Handles errors            │
└──────────────────────────────┘
   │
   │  Save Messages
   ▼
┌──────────────────────────────┐
│         DATABASE             │
│  - Stores chat history       │
│  - Memory for context        │
└──────────────────────────────┘
   │
   │  Final Response
   ▼
┌──────────────────────────────┐
│        FRONTEND (UI)         │
└──────────────────────────────┘
   │
   ▼
👤 USER
   Receives:
   "Hello, how can I help you today?"