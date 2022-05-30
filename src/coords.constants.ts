// 1) 39.83 , -1.00  (esquina superior izquierda)
// 2) 39.83 , -0.11  (esquina superior derecha)
// 3) 39,14 , -1.00  (esquina inferior izquierda)
// 4) 39.14 , -0.11  (esquina inferior derecha
export const limitCoords = {
  alicante: {
    'bottom-left': {
      lat: 38.11,
      long: -1.03,
    },
    'bottom-right': {
      lat: 38.11,
      long: -0.18,
    },
    'top-left': {
      lat: 38.56,
      long: -1.03,
    },
    'top-right': {
      lat: 38.56,
      long: -0.18,
    }
  },
  castellon: {
    'bottom-left': {
      lat: 39.77,
      long: -0.40,
    },
    'bottom-right': {
      lat: 39.77,
      long: 0.21,
    },
    'top-left': {
      lat: 40.14,
      long: -0.40,
    },
    'top-right': {
      lat: 40.14,
      long: 0.21,
    }
  },
  valencia: {
    'bottom-left': {
      lat: 39.14,  // lat: 39.14,
      long: -1.00,
    },
    'bottom-right': {
      lat: 39.14,
      long: -0.11,
    },
    'top-left': {
      lat: 39.83,
      long: -1.00,
    },
    'top-right': {
      lat: 39.83,
      long: -0.11,
    }
  },
};
