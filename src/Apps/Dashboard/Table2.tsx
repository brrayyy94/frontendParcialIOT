import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface Order2 {
    id: number;
    idnodo: number;
    distancia: number;
    presencia: string;
    fechahora: string;
}

// Generate Order Data
interface TablesProps {
    orders2: Order2[]
}

export default function Tables({ orders2 }: TablesProps) {
    return (
        <React.Fragment>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>id</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>idnodo</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>distancia</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>presencia</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>fechahora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders2.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {order.id}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {order.idnodo}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {order.distancia}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {order.presencia}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {new Date(order.fechahora).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
