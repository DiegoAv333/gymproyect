export const fixedPlans = [
  {
    id: 'plan_basic',
    name: 'Plan Básico',
    price: 29.99,
    description: 'Acceso al gimnasio en horario limitado.',
    schedule: 'Lunes a Viernes, 10:00 AM - 4:00 PM',
    features: [
      'Acceso a todas las áreas de pesas y cardio',
      'Uso de vestidores y duchas',
    ],
  },
  {
    id: 'plan_plus',
    name: 'Plan Plus',
    price: 49.99,
    description: 'Acceso ilimitado al gimnasio y clases grupales.',
    schedule: 'Lunes a Domingo, 6:00 AM - 10:00 PM',
    features: [
      'Todos los beneficios del Plan Básico',
      'Acceso a todas las clases grupales (Yoga, Spinning, etc.)',
      '10% de descuento en la tienda de suplementos',
    ],
  },
  {
    id: 'plan_premium',
    name: 'Plan Premium',
    price: 79.99,
    description: 'Todos los beneficios, más entrenamiento personalizado.',
    schedule: 'Acceso 24/7',
    features: [
      'Todos los beneficios del Plan Plus',
      '2 sesiones de entrenamiento personalizado al mes',
      'Acceso a la zona de spa (sauna y vapor)',
      'Toallas y agua de cortesía',
    ],
  },
];
