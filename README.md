# 🤠 Walker Texas Ranger

App contapassi premium per iOS e Android, costruita con **React Native**, **Expo (Managed Workflow)** e **TypeScript**. L'app offre un design moderno "White & Orange" con grafici animati e persistenza locale dei dati.

## 🚀 Funzionalità

- **Conteggio Real-time**: Monitoraggio passi istantaneo tramite sensori hardware.
- **Progress Ring Animato**: Visualizzazione dinamica del raggiungimento dell'obiettivo giornaliero.
- **Dati Salute**: Calcolo automatico di calorie bruciate (kcal) e chilometri percorsi (km).
- **Andamento Settimanale**: Grafico a barre per monitorare le performance degli ultimi 7 giorni.
- **Storico Completo**: Accesso ai dati passati con filtro per data e indicatori di successo.
- **Personalizzazione**: Impostazione dell'obiettivo passi (default 10.000).
- **Database Locale**: Tutti i dati sono salvati in modo sicuro sul dispositivo tramite SQLite.
- **Ottimizzazione Batteria**: Salvataggio intelligente ogni 100 passi per ridurre il carico sul sistema.

---

## 🛠️ Tecnologie

- **Core**: React Native + Expo SDK 54
- **Dati**: `expo-sqlite` (database locale)
- **Sensori**: `expo-sensors` (Pedometer)
- **Animazioni**: `react-native-reanimated`
- **Grafici**: `react-native-gifted-charts`
- **Design**: Vanilla CSS & Lucide Icons

---

## 📦 Installazione e Sviluppo

### Prerequisiti

- Node.js installato.
- Expo Go installato sul tuo smartphone (per test immediati).

### Setup Iniziale

```bash
# Installa le dipendenze
npm install
```

### Avviare lo Sviluppo

```bash
# Avvia il server di sviluppo (Metro Bundler)
npx expo start
```

_Inquadra il QR Code con l'app Expo Go (Android) o la fotocamera (iOS)._

---

## 🏗️ Generazione APK (Android)

Per generare un file APK installabile sul tuo dispositivo Android senza passare dal Play Store, utilizziamo **EAS (Expo Application Services)**.

### 1. Account Expo

Crea un account gratuito su [expo.dev](https://expo.dev) se non lo hai già.

### 2. Login EAS

Esegui il login nel tuo terminale:

```bash
npx eas-cli login
```

### 3. Build APK

Lancia il comando per generare l'APK (profilo preview):

```bash
npx eas-cli build --platform android --profile preview
```

### 4. Download

Al termine della compilazione (circa 10-15 minuti), EAS ti fornirà un **link** o un **QR Code**. Scansionalo con il telefono per scaricare e installare l'APK.

---

## 📂 Architettura

```
├── App.tsx                     # Gestione stato globale e navigazione
├── db.ts                       # Logica database (SQLite)
├── app.json                    # Configurazione Expo e Permessi
├── src/
│   ├── components/             # Componenti UI riutilizzabili
│   │   ├── ProgressRing.tsx    # Anello animato
│   │   └── TabBar.tsx          # Navigazione custom
│   └── screens/                # Schermate dell'applicazione
│       ├── DashboardScreen.tsx # Home con stats e grafico
│       ├── HistoryScreen.tsx   # Storico dati
│       └── SettingsScreen.tsx  # Impostazioni obiettivo
```

---

## 🛡️ Permessi

L'app richiede l'accesso ai dati di movimento:

- **Android**: `android.permission.ACTIVITY_RECOGNITION`
- **iOS**: `NSMotionUsageDescription`
