# Analisi Funzionale - dogsandcats

## 1. Introduzione

Il documento descrive in dettaglio la **Piattaforma dogsandcats**, un sistema web e mobile pensato unicamente per la gestione di **cani** e **gatti**, destinato a:

* **Associazioni animaliste** (rifugi, volontari, onlus)
* **Proprietari di pet** (cani, gatti)

Scopo: definire funzionalità, flussi utente e requisiti per la versione MVP e per le funzioni avanzate (cimitero virtuale e memoriali).

## 2. Scopo e Obiettivi

1. Centralizzare la gestione degli animali (anagrafiche, adozioni, volontari) per rifugi e associazioni.
2. Offrire ai proprietari un’area dedicata al proprio cane/gatto (salute, feed, ricordi, cimitero).
3. Popolare automaticamente la sezione pubblica del sito con dati inseriti in area riservata.
4. Garantire una piattaforma focalizzata **esclusivamente** su cani e gatti.

## 3. Ambito del Sistema

* **Utenti registrati**: associazioni, volontari, proprietari.
* **Area pubblica**: adozioni, memoriali, cimitero, feed.
* **Tecnologie MVP**: React (Web/Native), Node.js (REST API), PostgreSQL, servizi di notifica.

### 3.1 Ambito Iniziale

* **Specie supportate**: SOLO **cani** e **gatti**.
* **Schede Animale**: campi specifici per razza, taglia, microchip, comportamento.
* **Salute & Benessere**: cronologia vaccini tipici (parvovirus, leishmania, etc.), trattamenti antiparassitari.
* **Attività**: tracker delle passeggiate e tempo di gioco.

## 4. Attori

| Attore               | Descrizione                                                        |
| -------------------- | ------------------------------------------------------------------ |
| Associazione / Admin | Gestisce anagrafiche, volontari, adozioni, cimitero.               |
| Volontario           | Riceve incarichi, aggiorna disponibilità.                          |
| Proprietario Pet     | Gestisce profilo pet (solo cani/gatti), salute, ricordi, cimitero. |
| Visitatore Pubblico  | Consulta vetrina adozioni, memoriali, cimitero.                    |
| Sistema di Notifiche | Gestisce invio push/email per promemoria e incarichi.              |

## 5. Funzionalità e Use Cases

Le funzionalità sono organizzate per modulo, riflettendo i flussi utente sia delle associazioni sia dei proprietari.

### 5.1 Autenticazione & Profili

* **Registrazione/Login** (email+pwd, ruoli: associazione, volontario, proprietario).
* **Gestione Profilo** (nome, contatti, logo/foto).

### 5.2 Gestione Animali (Associazioni)

* CRUD schede (nome, specie cani/gatti, razza, età, stato sanitario, microchip, comportamento).
* Filtri avanzati (taglia, livello di energia, sterilizzazione).
* Lista d’attesa per adozioni e organizzazione open-day.

### 5.3 Piattaforma Adozioni

* Vetrina pubblica con filtri (razza, taglia, età, sterilizzazione).
* Modulo di contatto con questionario breve.
* Sezione “Adoption Stories” con storie di successo.

### 5.4 Rubrica Volontari & Workflow

* Elenco volontari con disponibilità e competenze.
* Assegnazione incarichi via notifica push/email.
* Monitoraggio formazione volontari.

### 5.5 Registro Salute & Promemoria (Proprietari)

* CRUD voci vaccini e trattamenti per cani/gatti.
* Calendario salute con reminder configurabili.
* Upload referti e documenti veterinari.

### 5.6 Profilo Pet & Feed Locale

* Profilo individuale per cane/gatto (nickname, foto, bio, tag comportamento).
* Feed con post, commenti, geolocalizzazione play-date.
* Segnalazioni Lost & Found con alert georiferiti.

### 5.7 Sezioni Pubbliche

* **Adozioni**: elenco animali disponibile, aggiornato in real time dai dati CRM.
* **Ricordi**: memoriali degli animali adottati, con foto e dediche.
* **Cimitero Virtuale**: area permanente per memorial cani/gatti (foto, date vita, dedica, donazioni).
* **Feed Aggregato**: mix di ultime adozioni, storie e memorial, con widget “Pet della settimana”.

## 6. Requisiti Non-Funzionali

* **Focalizzazione**: il sistema supporta **solo** cani e gatti.
* **Sicurezza & GDPR**: crittografia dati sensibili, gestione consensi.
* **Performance**: API ≤ 200 ms CRUD.
* **Scalabilità**: architettura modulare.
* **Disponibilità**: SLA ≥ 99.5%.
* **Accessibilità**: sia il sito web (frontend) sia le API e la documentazione del backend devono essere conformi a **WCAG 2.1 AA**, garantendo markup semantico, alternative testuali, corretto uso di ARIA e header e payload accessibili.
* **i18n**: IT/EN.

---

---

*Fine Analisi Funzionale dogsandcats MVP + Cimitero Virtuale*
