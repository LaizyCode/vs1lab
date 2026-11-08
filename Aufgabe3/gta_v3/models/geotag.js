// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    /**
     * Create a GeoTag instance.
     * @param {number|string} latitude - The latitude component of the location.
     * @param {number|string} longitude - The longitude component of the location.
     * @param {string} name - The name of the GeoTag location.
     * @param {string} [hashtag=''] - The optional hashtag for the location.
     */
    
    constructor(latitude, longitude, name, hashtag = '') {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.hashtag = hashtag;
    }
}

module.exports = GeoTag;
