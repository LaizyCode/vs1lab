// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    #geotags = []

    addGeoTag(geotag){
        this.#geotags.push(geotag);
    }

    removeGeoTag(name) {
        this.#geotags = this.#geotags.filter(
            geotag => geotag.name !== name
        );
    }

    getNearbyGeoTags(location, radius = 500){
        const sourceLat = parseFloat(location.latitude);
        const sourceLon = parseFloat(location.longitude);

        return this.#geotags.filter(geotag => {
            return this.#calculateDistance(sourceLat, sourceLon, geotag.latitude, geotag.longitude) <= radius;
        });
    }

    searchNearbyGeoTags(location, searchTerm, radius=500000){
        const tags = this.getNearbyGeoTags(location, radius);
        const term = (searchTerm || '').toLowerCase();
        return tags.filter(tag => {
           return (tag.name || '').toLowerCase().includes(term) || (tag.hashtag || '').toLowerCase().includes(term);
        })
    }

    #calculateDistance(sourceLat, sourceLon, targetLat, targetLon){
        const R = 6371000; // Erdradius in Metern
        const dLat = (targetLat - sourceLat) * Math.PI / 180;
        const dLon = (targetLon - sourceLon) * Math.PI / 180;
        
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(sourceLat * Math.PI / 180) *
            Math.cos(targetLat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

}

module.exports = InMemoryGeoTagStore
