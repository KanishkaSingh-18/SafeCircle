// Structured emergency categories for SafeCircle
// Each category includes common emergency numbers and practical actions.

export const emergencyCategories = [
  {
    id: 'women-safety',
    title: "Women's Safety",
    description: 'Immediate steps and contacts to improve safety when you feel threatened or unsafe.',
    emergencyNumbers: [
      { label: 'Local Police', phone: '112' },
      { label: 'Women Helpline', phone: '1091' },
    ],
    actions: [
      'Move to a public, well-lit area and stay where there are people.',
      'Call emergency services and provide your exact location.',
      'Use your SOS feature to notify trusted contacts with your location.',
      'If possible, remember details about the person and direction they went.',
    ],
  },

  {
    id: 'child-safety',
    title: 'Child Safety',
    description: 'Guidance for keeping children safe in public and responding quickly if they are missing or harmed.',
    emergencyNumbers: [
      { label: 'Local Police', phone: '112' },
      { label: 'Child Helpline', phone: '1098' },
    ],
    actions: [
      'Keep children within sight in crowded places and use identification if needed.',
      'If a child is missing, alert staff, security, and call the police immediately.',
      'Provide a recent photo and clothing description to responders.',
      'Do not chase into unsafe areas — coordinate with authorities for search efforts.',
    ],
  },

  {
    id: 'medical',
    title: 'Medical Emergency',
    description: 'Steps to take when someone experiences a serious injury or sudden illness.',
    emergencyNumbers: [
      { label: 'Ambulance', phone: '102' },
      { label: 'Emergency', phone: '112' },
    ],
    actions: [
      'Check for danger — ensure the scene is safe for you and the patient.',
      'Call ambulance and describe the situation (breathing, bleeding, consciousness).',
      'Provide first aid within your training: stop bleeding, perform CPR if needed.',
      'Keep the person warm and comfortable and follow dispatcher instructions.',
    ],
  },

  {
    id: 'fire',
    title: 'Fire & Rescue',
    description: 'Immediate actions to take when fire or smoke is detected in a building or vehicle.',
    emergencyNumbers: [
      { label: 'Fire Brigade', phone: '101' },
      { label: 'Local Emergency', phone: '112' },
    ],
    actions: [
      'Raise the alarm and call the fire service with your location.',
      'Evacuate quickly using the nearest safe exit; do not use elevators.',
      'Stay low to avoid smoke and cover your mouth with cloth if needed.',
      'Assemble at a safe meeting point and report any missing persons.',
    ],
  },

  {
    id: 'police',
    title: 'Police Help',
    description: 'How to contact law enforcement and what information to provide during incidents.',
    emergencyNumbers: [
      { label: 'Police Emergency', phone: '112' },
      { label: 'Non-emergency Police', phone: '100' },
    ],
    actions: [
      'If in immediate danger, call the police emergency number and give your location.',
      'Find a safe place and stay on the line to provide updates if asked.',
      'Avoid confronting suspects; observe and record details safely (appearance, direction).',
      'Preserve evidence and provide witness information to officers.',
    ],
  },

  {
    id: 'disaster',
    title: 'Disaster Response',
    description: 'Essential actions for common large-scale emergencies like floods, storms, or earthquakes.',
    emergencyNumbers: [
      { label: 'Disaster Management', phone: '108' },
      { label: 'Local Emergency', phone: '112' },
    ],
    actions: [
      'Follow official warnings and evacuation orders immediately.',
      'Move to higher ground for floods or take shelter away from windows during storms.',
      'Keep an emergency kit with water, flashlight, and basic first aid.',
      'Help neighbors if it is safe, and contact authorities for rescue if needed.',
    ],
  },
];

export default emergencyCategories;
