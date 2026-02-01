/**
 * Lagre data til flash-minne
 */
//% block="Datalogger"
//% icon="\uf0ce"
//% color="#378273"
namespace datalogger {
    export enum DeleteType {
        //% block="raskt"
        Fast,
        //% block="fullstendig"
        Full
    }

    let onLogFullHandler: () => void;
    let _disabled = false;

    let initialized = false;
    function init() {
        if (initialized)
            return;
        initialized = true;

        includeTimestamp(FlashLogTimeStampFormat.Seconds);
        mirrorToSerial(false);

        control.onEvent(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL, () => {
            _disabled = true;
            if (onLogFullHandler) {
                onLogFullHandler();
            } else {
                basic.showLeds(`
                    # . . . #
                    # # . # #
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                basic.pause(1000);
                basic.clearScreen();
                basic.showString("928");
            }
        });
    }


    export class ColumnValue {
        public value: string;
        constructor(
            public column: string,
            value: any
        ) {
            this.value = "" + value;
        }
    }

    /**
     * A column and value to log to flash storage
     * @param column the column to set
     * @param value the value to set.
     * @returns A new value that can be stored in flash storage using log data
     */
    //% block="kolonne $column verdi $value"
    //% value.shadow=math_number
    //% column.shadow=datalogger_columnfield
    //% blockId=dataloggercreatecolumnvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=datalogger/create-cv
    export function createCV(column: string, value: any): ColumnValue {
        return new ColumnValue(column, value);
    }

    //% block="$column"
    //% blockId=datalogger_columnfield
    //% group="micro:bit (V2)"
    //% blockHidden=true shim=TD_ID
    //% column.fieldEditor="autocomplete" column.fieldOptions.decompileLiterals=true
    //% column.fieldOptions.key="dataloggercolumn"
    export function _columnField(column: string) {
        return column
    }

    /**
     * Log data to flash storage
     * @param data Array of data to be logged to flash storage
     */
    //% block="lagre data array $data"
    //% blockId=dataloggerlogdata
    //% data.shadow=lists_create_with
    //% data.defl=dataloggercreatecolumnvalue
    //% group="micro:bit (V2)"
    //% blockHidden=true
    //% weight=100
    export function logData(data: ColumnValue[]): void {
        if (!data || !data.length)
            return;
        init();

        if (_disabled)
            return;

        flashlog.beginRow();
        for (const cv of data) {
            flashlog.logData(cv.column, cv.value);
        }
        flashlog.endRow();
    }

    /**
     * Log data to flash storage
     * @param data1 First column and value to be logged
     * @param data2 [optional] second column and value to be logged
     * @param data3 [optional] third column and value to be logged
     * @param data4 [optional] fourth column and value to be logged
     * @param data5 [optional] fifth column and value to be logged
     * @param data6 [optional] sixth column and value to be logged
     * @param data7 [optional] seventh column and value to be logged
     * @param data8 [optional] eighth column and value to be logged
     * @param data9 [optional] ninth column and value to be logged
     * @param data10 [optional] tenth column and value to be logged
     * @param data11 [optional] elleventh column and value to be logged
     * @param data12 [optional] twelveth column and value to be logged
     * @param data13 [optional] thirtenth column and value to be logged
     * @param data14 [optional] fourtenth column and value to be logged
     * @param data15 [optional] fifthtenth column and value to be logged
     * @param data16 [optional] sixtenth column and value to be logged
     * @param data17 [optional] seventeth column and value to be logged
     * @param data18 [optional] eightenth column and value to be logged
     * @param data19 [optional] ninetenth column and value to be logged
     * @param data20 [optional] twentieth column and value to be logged
     */
    //% block="logg data $data1||$data2 $data3 $data4 $data5 $data6 $data7 $data8 $data9 $data10 $data11 $data12 $data13 $data14 $data15 $data16 $data17 $data18 $data19 $data20"
    //% blockId=dataloggerlog
    //% data1.shadow=dataloggercreatecolumnvalue
    //% data2.shadow=dataloggercreatecolumnvalue
    //% data3.shadow=dataloggercreatecolumnvalue
    //% data4.shadow=dataloggercreatecolumnvalue
    //% data5.shadow=dataloggercreatecolumnvalue
    //% data6.shadow=dataloggercreatecolumnvalue
    //% data7.shadow=dataloggercreatecolumnvalue
    //% data8.shadow=dataloggercreatecolumnvalue
    //% data9.shadow=dataloggercreatecolumnvalue
    //% data10.shadow=dataloggercreatecolumnvalue
    //% data11.shadow=dataloggercreatecolumnvalue
    //% data12.shadow=dataloggercreatecolumnvalue
    //% data13.shadow=dataloggercreatecolumnvalue
    //% data14.shadow=dataloggercreatecolumnvalue
    //% data15.shadow=dataloggercreatecolumnvalue
    //% data16.shadow=dataloggercreatecolumnvalue
    //% data17.shadow=dataloggercreatecolumnvalue
    //% data18.shadow=dataloggercreatecolumnvalue
    //% data19.shadow=dataloggercreatecolumnvalue
    //% data20.shadow=dataloggercreatecolumnvalue
    //% inlineInputMode="variable"
    //% inlineInputModeLimit=1
    //% group="micro:bit (V2)"
    //% weight=100 help=datalogger/log
    export function log(
        data1: datalogger.ColumnValue,
        data2?: datalogger.ColumnValue,
        data3?: datalogger.ColumnValue,
        data4?: datalogger.ColumnValue,
        data5?: datalogger.ColumnValue,
        data6?: datalogger.ColumnValue,
        data7?: datalogger.ColumnValue,
        data8?: datalogger.ColumnValue,
        data9?: datalogger.ColumnValue,
        data10?: datalogger.ColumnValue,
        data11?: datalogger.ColumnValue,
        data12?: datalogger.ColumnValue,
        data13?: datalogger.ColumnValue,
        data14?: datalogger.ColumnValue,
        data15?: datalogger.ColumnValue,
        data16?: datalogger.ColumnValue,
        data17?: datalogger.ColumnValue,
        data18?: datalogger.ColumnValue,
        data19?: datalogger.ColumnValue,
        data20?: datalogger.ColumnValue
    ): void {
        logData(
            [
                data1,
                data2,
                data3,
                data4,
                data5,
                data6,
                data7,
                data8,
                data9,
                data10,
                data11,
                data12,
                data13,
                data14,
                data15,
                data16,
                data17,
                data18,
                data19,
                data20,
            ].filter(el => !!el)
        );
    }

    /**
     * Set the columns for future data logging
     * @param cols Array of the columns that will be logged.
     */
    //% block="sett kolonne $cols"
    //% blockId=dataloggersetcolumns
    //% data.shadow=list_create_with
    //% data.defl=datalogger_columnfield
    //% group="micro:bit (V2)"
    //% blockHidden=true
    //% weight=70
    export function setColumns(cols: string[]): void {
        if (!cols)
            return;

        logData(cols.map(col => createCV(col, "")));
    }

    /**
     * Set the columns for future data logging
     * @param col1 Title for first column to be added
     * @param col2 Title for second column to be added
     * @param col3 Title for third column to be added
     * @param col4 Title for fourth column to be added
     * @param col5 Title for fifth column to be added
     * @param col6 Title for sixth column to be added
     * @param col7 Title for seventh column to be added
     * @param col8 Title for eighth column to be added
     * @param col9 Title for ninth column to be added
     * @param col10 Title for tenth column to be added
     * @param col11 Title for elleventh column to be added
     * @param col12 Title for twelveth column to be added
     * @param col13 Title for thirtenth column to be added
     * @param col14 Title for fourtenth column to be added
     * @param col15 Title for fifthtenth column to be added
     * @param col16 Title for sixtenth column to be added
     * @param col17 Title for sevententh column to be added
     * @param col18 Title for eighttenth column to be added
     * @param col19 Title for ninetenth column to be added
     * @param col20 Title for twentieth column to be added
     */
    //% block="sett kolonner $col1||$col2 $col3 $col4 $col5 $col6 $col7 $col8 $col9 $col10 $col11 $col12 $col13 $col14 $col15 $col16 $col17 $col18 $col19 $col20"
    //% blockId=dataloggersetcolumntitles
    //% inlineInputMode="variable"
    //% inlineInputModeLimit=1
    //% group="micro:bit (V2)"
    //% weight=70 help=datalogger/set-column-titles
    //% col1.shadow=datalogger_columnfield
    //% col2.shadow=datalogger_columnfield
    //% col3.shadow=datalogger_columnfield
    //% col4.shadow=datalogger_columnfield
    //% col5.shadow=datalogger_columnfield
    //% col6.shadow=datalogger_columnfield
    //% col7.shadow=datalogger_columnfield
    //% col8.shadow=datalogger_columnfield
    //% col9.shadow=datalogger_columnfield
    //% col10.shadow=datalogger_columnfield
    //% col11.shadow=datalogger_columnfield
    //% col12.shadow=datalogger_columnfield
    //% col13.shadow=datalogger_columnfield
    //% col14.shadow=datalogger_columnfield
    //% col15.shadow=datalogger_columnfield
    //% col16.shadow=datalogger_columnfield
    //% col17.shadow=datalogger_columnfield
    //% col18.shadow=datalogger_columnfield
    //% col19.shadow=datalogger_columnfield
    //% col20.shadow=datalogger_columnfield
    export function setColumnTitles(
        col1: string,
        col2?: string,
        col3?: string,
        col4?: string,
        col5?: string,
        col6?: string,
        col7?: string,
        col8?: string,
        col9?: string,
        col10?: string,
        col11?: string,
        col12?: string,
        col13?: string,
        col14?: string,
        col15?: string,
        col16?: string,
        col17?: string,
        col18?: string,
        col19?: string,
        col20?: string
    ): void {
        logData(
            [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13, col14, col15, col16, col17, col18, col19, col20]
                .filter(el => !!el)
                .map(col => createCV(col, ""))
        );
    }

    /**
     * Delete all existing logs, including column headers. By default this only marks the log as
     * overwriteable / deletable in the future.
     * @param deleteType optional set whether a deletion will be fast or full
     */
    //% block="slett logg||$deleteType"
    //% blockId=dataloggerdeletelog
    //% group="micro:bit (V2)"
    //% weight=60 help=datalogger/delete-log
    export function deleteLog(deleteType?: DeleteType): void {
        init();
        flashlog.clear(deleteType === DeleteType.Full);
        _disabled = false;
    }

    /**
     * Register an event to run when no more data can be logged.
     * @param handler code to run when the log is full and no more data can be stored.
     */
    //% block="når logg er full"
    //% blockId="on log full"
    //% group="micro:bit (V2)"
    //% weight=40 help=datalogger/on-log-full
    export function onLogFull(handler: () => void): void {
        init();
        onLogFullHandler = handler;
    }

    /**
     * Set the format for timestamps
     * @param format Format in which to show the timestamp. Setting FlashLogTimeStampFormat.None will disable the timestamp.
     */
    //% block="sett tidsstempel $format"
    //% blockId=dataloggertoggleincludetimestamp
    //% format.defl=FlashLogTimeStampFormat.None
    //% group="micro:bit (V2)"
    //% weight=30 help=datalogger/include-timestamp
    export function includeTimestamp(format: FlashLogTimeStampFormat): void {
        init();
        flashlog.setTimeStamp(format);
    }

    /**
     * Set whether data is mirrored to serial or not.
     * @param on if true, data that is logged will be mirrored to serial
     */
    //% block="speil data til serial $on"
    //% blockId=dataloggertogglemirrortoserial
    //% on.shadow=toggleOnOff
    //% on.defl=false
    //% weight=25 help=datalogger/mirror-to-serial
    export function mirrorToSerial(on: boolean): void {
        // TODO:/note intentionally does not have group, as having the same group for all
        // blocks in a category causes the group to be elided.
        init();
        flashlog.setSerialMirroring(on);
    }

    /**
     * Number of rows currently used by the datalogger, start counting at fromRowIndex
     * Treats the header as the first row
     * @param fromRowIndex 0-based index of start
     * @returns header + rows
     */
    export function getNumberOfRows(fromRowIndex: number = 0): number {
        return flashlog.getNumberOfRows(fromRowIndex);
    }

    /**
     * Get all rows seperated by a newline & each column seperated by a comma.
     * Starting at the 0-based index fromRowIndex & counting inclusively until nRows.
     * @param fromRowIndex 0-based index of start
     * @param nRows inclusive count from fromRowIndex
     * @returns String where newlines denote rows & commas denote columns
     */
    export function getRows(fromRowIndex: number, nRows: number): string {
        return flashlog.getRows(fromRowIndex, nRows);
    }
}