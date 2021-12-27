import { faLandmark, faTheaterMasks, faPalette } from '@fortawesome/free-solid-svg-icons';

const CATEGORIES = {
    art: {
        name: 'Art',
        icon: faPalette,
        color: 'green',
    },
    entertainment: {
        name: 'Entertainment',
        icon: faTheaterMasks,
        color: 'yellow',
    },
    history: {
        name: 'History',
        icon: faLandmark,
        color: 'red',
    },
};

export default CATEGORIES;
