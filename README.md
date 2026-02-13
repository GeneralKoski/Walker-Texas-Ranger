# Walker Texas Ranger

App contapassi per iOS e Android, costruita con React Native, Expo e TypeScript.

## Funzionalità

- Conteggio passi in tempo reale tramite sensore pedometro
- Anello di progresso animato con cambio colore
- Statistiche giornaliere (calorie, km percorsi)
- Grafico andamento settimanale
- Storico passi con filtro per data
- Obiettivo giornaliero personalizzabile
- Salvataggio dati locale con SQLite

## Struttura progetto

```
├── App.tsx                     # Stato globale e routing
├── db.ts                       # Database SQLite (passi, impostazioni)
├── index.js                    # Entry point Expo
├── tsconfig.json               # Configurazione TypeScript (strict)
├── src/
│   ├── components/
│   │   ├── GlassCard.tsx       # Card con effetto vetro
│   │   ├── ProgressRing.tsx    # Anello progresso animato
│   │   └── TabBar.tsx          # Barra navigazione
│   └── screens/
│       ├── DashboardScreen.tsx # Home (passi, stats, grafico)
│       ├── HistoryScreen.tsx   # Storico passi
│       └── SettingsScreen.tsx  # Impostazioni
```

## Setup

```bash
npm install
npx expo start
```

## Tech stack

- TypeScript (strict mode)
- React Native + Expo SDK 54
- expo-sensors (pedometro)
- expo-sqlite (database locale)
- react-native-reanimated (animazioni)
- react-native-gifted-charts (grafici)
- lucide-react-native (icone)
