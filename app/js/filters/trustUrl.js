//Strict Contextual Escaping - to result in a value that is marked as safe to use for that context.
newsPortalApp.filter("trustUrl", function ($sce) {
    return function (sourceUrl) {
        return $sce.trustAsResourceUrl(sourceUrl);
    };
});