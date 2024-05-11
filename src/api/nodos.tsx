export const ManageNodosService = {
    baseUrl: import.meta.env.VITE_IOT_NODOS,
    endpoints: {
        getNodos: '/',
        getMagnetico: '/magnetico',
        getMagneticoAdmin: '/magnetico/admin',
        getUltrasonido: '/ultrasonido',
        getUltrasonidoAdmin: '/ultrasonido/admin',
        postMagnetico: '/magnetico',
        postUltrasonido: '/ultrasonido',
        deleteMagnetico: '/magnetico',
        deleteUltrasonido: '/ultrasonido',
    },
};