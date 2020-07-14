import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    container: {
        background: 'rgb(30, 33, 38)',
    },
    header: {
        paddingRight: props => props.padding,
    },
    body: {
        overflow: 'hidden',
        height: 'calc(100vh - 155px)',
        paddingRight: props => props.padding,
        '&:hover': {
            paddingRight: 0,
            overflow: 'auto',
        }
    },
    table: {
        minWidth: 250,
    },
    row: {
        width: 'calc(100% - 17px)',
        height: 15
    },
    header__cell: {
        color: 'rgb(146, 154, 165)',
        border: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '5px 15px 10px',
    },
    cell: {
        border: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '3px 15px',
        color: '#E6E8EA'
    },
    tableBody: {
        maxHeight: "100px",
    }
});

function createData(amount, price, total) {
    return {amount, price, total};
}

const rows = [
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
    createData(159, 6.0, 24),
];

function useWindowSize(elem) {
    const isClient = typeof window === 'object';

    function getOverflow(elem) {
        if (elem.current)
            return elem.current.scrollHeight > elem.current.offsetHeight;
        return false;
    }

    const [isOverflow, setOverflow] = useState(getOverflow(elem));

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setOverflow(getOverflow(elem));
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isOverflow;
}

export default function TradeTable() {
    const styleProps = {padding: 0};
    const table = useRef();

    const overflow = useWindowSize(table);
    if (overflow)
        styleProps.padding = 17;

    useEffect(()=> {
        const {current} = table;
        if(current.scrollHeight > current.offsetHeight){
            styleProps.padding = 17;
            current.style.paddingRight = '17px';
            function setPadding(){
                current.style.paddingRight = '0';
                styleProps.padding = 0;
            }

            function unsetPadding(){
                current.style.paddingRight = '17px';
                styleProps.padding = 17;
            }

            current.addEventListener("mouseover", setPadding);
            current.addEventListener("mouseleave", unsetPadding);

            return () => {
                current.removeEventListener('mouseover', setPadding);
                current.removeEventListener('mouseleave', unsetPadding);
            }
        }
    });

    const classes = useStyles(styleProps);

    return (
        <TableContainer component={Paper} className={classes.container}>
            <div className={classes.header}>
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className={classes.header__cell}>Amount</TableCell>
                            <TableCell align="right" className={classes.header__cell}>Price</TableCell>
                            <TableCell align="right" className={classes.header__cell}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>
            <div className={classes.body} id={'table'} ref={table}>
                <Table className={classes.table} style={{tableLayout: 'fixed'}}>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row, i) => (
                            <TableRow className={classes.row} key={i}>
                                <TableCell align="left" className={classes.cell}>{row.amount}</TableCell>
                                <TableCell align="right" className={classes.cell}>{row.price}</TableCell>
                                <TableCell align="right" className={classes.cell}>{row.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
    );
}