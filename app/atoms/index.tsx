import {atom} from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});

export const textState = atom({
  key: 'textState',
  default: '',
});

export const emailState = atom({
  key: 'emailState',
  default: '',
});

export const structureOptionsState = atom({
  key: 'structureOptionsState',
  default: [],
});

export const specialtyOptionsState = atom({
  key: 'specialtyOptionsState',
  default: [],
});

export const medicListState = atom({
  key: 'medicListState',
  default: [
    {
      name: 'Dr. Julien Peignet',
      domain: 'Psychiatrie',
      specialty: 'Médecine générale',
    },
    {
      name: 'Dr Marine Deschamps',
      domain: 'Oto-rhino-laryngie',
      specialty: 'Médecine générale',
    },
    {
      name: 'Dr Jean-Eudes de la Ruits-Picard',
      domain: 'Néphrologie',
      specialty: 'Médecine générale',
    },
  ],
});

export const substituteExperiencesListState = atom({
  key: 'substituteExperiencesListState',
  default: [
    {
      monthYear: 'Juin 2020',
      structureNameTitle: 'CHU de Perpan',
      missionDescription:
        'Médecine générale et ceci est une description des missions',
    },
    {
      monthYear: 'Mai 2020 - Juin 2020',
      structureNameTitle: 'CHU de Purpan de sainte marguerite',
      missionDescription:
        'Médecine générale et ceci est une description des missions',
    },
  ],
});
