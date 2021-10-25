import { saveAs } from 'file-saver'
import Store from '../store'

/**
 * This function downloads the current application data in a JSON file, for later use
 */
export const downloadConfigurationAsJSON = () => {
    saveAs(
        new Blob([ JSON.stringify(Store.getState(), undefined, 4) ], { type: 'application/json' }),
        'RESSTAT Data Configuration.json'
    )
}