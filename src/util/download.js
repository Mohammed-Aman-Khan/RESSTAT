import { saveAs } from 'file-saver'
import Store from '../store'

export const downloadConfigurationAsJSON = () => {
    saveAs(
        new Blob([ JSON.stringify(Store.getState()) ], { type: 'application/json' }),
        'RESSTAT Data Configuration.json'
    )
}