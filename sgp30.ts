//% color=#A30F93 weight=30 icon="\uf0c2" block="SGP30 - Luftkvalitet"
namespace SGP30 {

    const SGP30_ADDR = 0x58

    let eco2 = 400
    let tvoc = 0
    let h2 = 0
    let ethanol = 0

    let initialized = false

    // ==================================================
    // INITIALISERING
    // ==================================================
    //% block="initialiser SGP30"
    //% group="Oppsett"
    export function init(): void {
        if (initialized) return

        // IAQ init
        i2cWriteWord(0x2003)

        // Datasheet: minst 15 s burn-in
        basic.pause(15000)

        initialized = true
    }

    // ==================================================
    // UTFØR ÉN MÅLING (brukeren styrer timing)
    // ==================================================
    //% block="mål luftkvalitet"
    //% group="Luftkvalitet"
    export function measure(): void {
        if (!initialized) init()

        // IAQ (eCO₂ + TVOC)
        i2cWriteWord(0x2008)
        basic.pause(12)

        let d = i2cRead6()
        eco2 = (d[0] << 8) | d[1]
        tvoc = (d[3] << 8) | d[4]

        // Råsignaler
        i2cWriteWord(0x2050)
        basic.pause(25)

        d = i2cRead6()
        h2 = (d[0] << 8) | d[1]
        ethanol = (d[3] << 8) | d[4]
    }

    // ==================================================
    // VERDIER
    // ==================================================
    //% block="eCO₂ (ppm)"
    //% group="Luftkvalitet"
    export function eCO2(): number {
        return eco2
    }

    //% block="TVOC (ppb)"
    //% group="Luftkvalitet"
    export function TVOC(): number {
        return tvoc
    }

    //% block="rå H₂"
    //% group="Luftkvalitet"
    export function rawH2(): number {
        return h2
    }

    //% block="rå etanol"
    //% group="Luftkvalitet"
    export function rawEthanol(): number {
        return ethanol
    }

    // ==================================================
    // I2C HJELPEFUNKSJONER
    // ==================================================
    function i2cWriteWord(cmd: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = (cmd >> 8) & 0xFF
        buf[1] = cmd & 0xFF
        pins.i2cWriteBuffer(SGP30_ADDR, buf)
    }

    function i2cRead6(): number[] {
        let buf = pins.i2cReadBuffer(SGP30_ADDR, 6)
        let arr: number[] = []
        for (let i = 0; i < 6; i++) arr.push(buf[i])
        return arr
    }
}