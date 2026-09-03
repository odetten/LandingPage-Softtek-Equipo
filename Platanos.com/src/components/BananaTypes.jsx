import { useMemo, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    Sphere,
    ZoomableGroup,
} from "react-simple-maps";
import worldMap from "world-atlas/countries-110m.json";

const BANANA_TYPES = [
    {
        id: "amarillo",
        name: "Plátano amarillo",
        background: "#F1E72C",
        accent: "#6B5B00",
        ink: "#1C1B12",
        center: [14, 4],
        zoom: 1.08,
        countries: ["356", "218", "156", "170", "188", "608", "360", "076", "320", "484"],
    },
    {
        id: "plantain",
        name: "Plantain",
        background: "#A8C96F",
        accent: "#315A28",
        ink: "#142313",
        center: [-8, 3],
        zoom: 1.24,
        countries: ["120", "566", "288", "384", "180", "800", "646", "834", "170", "218", "862", "214", "332", "192"],
    },
    {
        id: "dominicano",
        name: "Dominicano",
        background: "#F0AE54",
        accent: "#8B4518",
        ink: "#271409",
        center: [-82, 15],
        zoom: 1.85,
        countries: ["484", "320", "340", "222", "558", "188", "591", "192", "332", "214", "388", "170", "218"],
    },
    {
        id: "morado-rojo",
        name: "Morado / Rojo",
        background: "#A94F63",
        accent: "#5F2034",
        ink: "#FFF8F5",
        center: [86, 7],
        zoom: 1.42,
        countries: ["356", "144", "050", "104", "764", "116", "704", "458", "360", "608", "598", "484"],
    },
    {
        id: "azul",
        name: "Azul",
        background: "#7FA8D0",
        accent: "#294D70",
        ink: "#102135",
        center: [142, -5],
        zoom: 1.48,
        countries: ["360", "608", "458", "764", "704", "598", "036", "242"],
    },
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function BananaTypes() {
    const [activeId, setActiveId] = useState(BANANA_TYPES[0].id);
    const activeType = BANANA_TYPES.find((type) => type.id === activeId) ?? BANANA_TYPES[0];
    const [mapPosition, setMapPosition] = useState({
        coordinates: activeType.center,
        zoom: activeType.zoom,
    });

    const highlightedCountries = useMemo(
        () => new Set(activeType.countries),
        [activeType]
    );

    const selectType = (type) => {
        setActiveId(type.id);
        setMapPosition({
            coordinates: type.center,
            zoom: type.zoom,
        });
    };

    const setZoom = (nextZoom) => {
        setMapPosition((currentPosition) => ({
            ...currentPosition,
            zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom)),
        }));
    };

    const resetMap = () => {
        setMapPosition({
            coordinates: activeType.center,
            zoom: activeType.zoom,
        });
    };

    return (
        <section
            id="tipos"
            className="banana-types"
            style={{
                "--banana-theme": activeType.background,
                "--banana-accent": activeType.accent,
                "--banana-theme-ink": activeType.ink,
            }}
        >
            <div className="banana-types__selector">
                <div className="banana-types__selector-inner">
                    <header className="banana-types__heading">
                        <h2>Tipos de plátanos</h2>
                    </header>

                    <div className="banana-types__list" aria-label="Tipos de plátano">
                        {BANANA_TYPES.map((type) => {
                            const isActive = type.id === activeType.id;

                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    className={`banana-type-card${isActive ? " is-active" : ""}`}
                                    aria-pressed={isActive}
                                    onClick={() => selectType(type)}
                                >
                                    <span className="banana-type-card__name">{type.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="banana-types__map-panel">
                <div className="banana-types__map-wrap">
                    <div className="banana-map__intro" key={activeType.id} aria-live="polite">
                        <h3>{activeType.name}</h3>
                    </div>

                    <div className="banana-map__canvas">
                        <ComposableMap
                            projection="geoEqualEarth"
                            projectionConfig={{ scale: 148 }}
                            width={800}
                            height={500}
                            role="img"
                            aria-label={`Mapa de zonas de cultivo aproximadas del ${activeType.name}`}
                        >
                            <ZoomableGroup
                                center={mapPosition.coordinates}
                                zoom={mapPosition.zoom}
                                minZoom={MIN_ZOOM}
                                maxZoom={MAX_ZOOM}
                                onMoveEnd={setMapPosition}
                            >
                                <Sphere
                                    id="banana-map-sphere"
                                    fill="#F8F7EF"
                                    stroke="rgba(31, 31, 24, 0.13)"
                                    strokeWidth={0.7}
                                />
                                <Graticule
                                    fill="transparent"
                                    stroke="rgba(31, 31, 24, 0.075)"
                                    strokeWidth={0.45}
                                />
                                <Geographies geography={worldMap}>
                                    {({ geographies }) =>
                                        geographies.map((geography) => {
                                            const countryId = String(geography.id).padStart(3, "0");
                                            const isHighlighted = highlightedCountries.has(countryId);

                                            return (
                                                <Geography
                                                    key={geography.rsmKey}
                                                    geography={geography}
                                                    tabIndex={-1}
                                                    aria-hidden="true"
                                                    className="banana-map__geography"
                                                    fill={isHighlighted ? activeType.accent : "#DEDED4"}
                                                    stroke="#F8F7EF"
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { outline: "none" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>

                        <div className="banana-map__controls" aria-label="Controles del mapa">
                            <button
                                type="button"
                                aria-label="Acercar mapa"
                                title="Acercar"
                                onClick={() => setZoom(mapPosition.zoom + 0.45)}
                                disabled={mapPosition.zoom >= MAX_ZOOM}
                            >
                                <span aria-hidden="true">+</span>
                            </button>
                            <button
                                type="button"
                                aria-label="Alejar mapa"
                                title="Alejar"
                                onClick={() => setZoom(mapPosition.zoom - 0.45)}
                                disabled={mapPosition.zoom <= MIN_ZOOM}
                            >
                                <span aria-hidden="true">−</span>
                            </button>
                            <button
                                type="button"
                                aria-label="Restablecer posición del mapa"
                                title="Restablecer"
                                onClick={resetMap}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5.1 9A7.2 7.2 0 1 1 5 15m.1-6H2m3.1 0V5.9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BananaTypes;
