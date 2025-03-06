├── docs/
│   └── documentation.md
├── public/
│   ├── favicon.ico
│   ├── assets/
│   │   └── icons/
│   └── ...
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── map/
│   │   │   ├── Map.jsx
│   │   │   ├── layers/           # Componentes específicos para capas
│   │   │   ├── controls/         # Controles personalizados
│   │   │   ├── menu/             # Menús del mapa
│   │   │   └── ui/               # UI específica del mapa
│   │   ├── ui/                   # UI general
│   │   └── ...
│   ├── lib/
│   │   ├── ol-plugins/           # Plugins propios de OpenLayers
│   │   └── ...
│   ├── hooks/
│   │   ├── useMap.js             # Hook para acceder al mapa
│   │   └── ...
│   ├── utils/
│   │   ├── map-utils.js          # Utilidades específicas del mapa
│   │   └── ...
│   ├── config/
│   │   ├── map-config.json       # Configuración general
│   │   └── ...
│   └── styles/
│       ├── font/
│       │   └── ...
│       ├── map/
│       │   └── global.css
│       └── global.css
├── index.html
├── vite.config.js
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
└── README.md