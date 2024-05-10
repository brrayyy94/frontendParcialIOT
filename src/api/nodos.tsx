export const ManageNodosService = {
    baseUrl: import.meta.env.VITE_IOT_NODOS,
    endpoints: {
        getNodos: '/',
        getMagnetico: '/magnetico',
        getUltrasonido: '/ultrasonido',
        postMagnetico: '/magnetico',
        postUltrasonido: '/ultrasonido',
        deleteMagnetico: '/magnetico',
        deleteUltrasonido: '/ultrasonido',
    },
};