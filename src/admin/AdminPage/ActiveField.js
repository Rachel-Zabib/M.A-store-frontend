import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    activeTrue: {
        color: 'green',
    },
    activeFalse: {
        color: 'red',
    },
});

const ActiveField = ({ record = {}, source }) => {
    const classes = useStyles();
    return (
        <p className={record[source]==="true"?classes.activeTrue:classes.activeFalse}>
            {record[source]}
        </p>
      
    );
}
export default ActiveField;