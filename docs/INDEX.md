# Indice Rapido Documentazione - DogsAndCats

## 📋 Documenti Principali

### [docs/README.md](./README.md)
- **Scopo**: Overview generale e navigazione
- **Quando consultarlo**: Per capire la struttura generale della documentazione

### [docs/analysis/analisi-funzionale.md](./analysis/analisi-funzionale.md)
- **Scopo**: Requisiti funzionali, casi d'uso, modello dati
- **Quando consultarlo**: Per domande su funzionalità, requisiti, attori del sistema

### [docs/framework/framework-sviluppo.md](./framework/framework-sviluppo.md)
- **Scopo**: Stack tecnologico, architettura, setup, convenzioni
- **Quando consultarlo**: Per domande tecniche, setup ambiente, deployment

### [docs/user-stories/user-stories.md](./user-stories/user-stories.md)
- **Scopo**: User stories, epiche, backlog, sprint planning
- **Quando consultarlo**: Per domande su features, priorità, planning

## 🚀 Configurazione Progetto

### Dettagli Tecnici Importanti
- **Porta Server**: 8001 (non 8000)
- **Database**: PostgreSQL in Laragon
- **IDE**: Cursor
- **Repository**: https://github.com/stefanochermazts/dogsandcats.git

### Struttura Directory
```
dogsandcats/
├── docs/                 # Documentazione
│   ├── analysis/        # Analisi funzionale
│   ├── framework/       # Framework di sviluppo
│   └── user-stories/    # User stories
├── src/                 # Codice sorgente
├── tests/              # Test
├── config/             # Configurazioni
└── public/             # Asset pubblici
```

## 📝 Template Disponibili

### Per Nuove User Stories
```markdown
##### US[XXX]: [Titolo User Story]
- **Come** [tipo di utente]
- **Voglio** [obiettivo/funzionalità]
- **Così che** [beneficio/motivazione]

**Criteri di Accettazione:**
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

**Priorità**: Alta/Media/Bassa  
**Stima**: [Story Points]  
**Epic**: [Nome Epic]
```

### Per Nuovi Casi d'Uso
```markdown
##### UC[XX]: [Nome Caso d'Uso]
- **Attore Primario**: 
- **Precondizioni**: 
- **Flusso Principale**: 
  1. 
  2. 
  3. 
- **Flussi Alternativi**: 
- **Postcondizioni**: 
```

## 🔄 Workflow di Aggiornamento

1. **Modifica Codice** → Aggiorna documentazione tecnica
2. **Nuova Feature** → Aggiungi user story
3. **Nuovo Requisito** → Aggiorna analisi funzionale
4. **Cambio Stack** → Aggiorna framework di sviluppo

---

**Ultimo aggiornamento**: [Data]  
**Versione**: 1.0 