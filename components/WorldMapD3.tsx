'use client';

import { useEffect, useRef } from 'react';

interface WorldMapD3Props {
  activeCountries: Set<string>;
  mapType: 'source' | 'target';
  allTargetCodes: string[];
  countryData: Record<string, { name: string; lang: string; flag: string }>;
  getZone: (cc: string) => { l: string; r: string; c: string };
  onCountryClick?: (cc: string) => void;
}

export default function WorldMapD3({
  activeCountries, mapType, allTargetCodes, countryData, getZone, onCountryClick
}: WorldMapD3Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let d3: typeof import('d3') | null = null;
    let topo: typeof import('topojson-client') | null = null;

    async function render() {
      const [d3mod, topomod, geoData] = await Promise.all([
        import('d3'),
        import('topojson-client'),
        fetch('/world-110m.json').then(r => r.json()),
      ]);
      d3 = d3mod; topo = topomod;

      const svg = d3.select(svgRef.current!);
      svg.selectAll('*').remove();

      const W = 900, H = 460;
      const proj = d3.geoNaturalEarth1().scale(145).translate([W / 2, H / 2 + 10]);
      const pathGen = d3.geoPath().projection(proj);

      // Ocean
      svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#080d1a').attr('rx', 8);
      svg.append('path').datum({ type: 'Sphere' } as unknown as GeoJSON.GeoJsonObject)
        .attr('d', pathGen as any).attr('fill', 'none')
        .attr('stroke', 'rgba(0,212,255,0.06)').attr('stroke-width', 1.2);
      svg.append('path').datum(d3.geoGraticule()())
        .attr('d', pathGen as any).attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.035)').attr('stroke-width', 0.35);

      // ISO numeric → alpha2
      const ISO: Record<number, string> = {
        4:'AF',8:'AL',12:'DZ',20:'AD',24:'AO',32:'AR',36:'AU',40:'AT',50:'BD',56:'BE',64:'BT',68:'BO',70:'BA',76:'BR',
        100:'BG',104:'MM',116:'KH',120:'CM',124:'CA',140:'CF',144:'LK',148:'TD',152:'CL',170:'CO',174:'KM',178:'CG',
        180:'CD',188:'CR',191:'HR',192:'CU',196:'CY',203:'CZ',204:'BJ',208:'DK',214:'DO',218:'EC',222:'SV',226:'GQ',
        231:'ET',232:'ER',246:'FI',250:'FR',262:'DJ',266:'GA',276:'DE',288:'GH',300:'GR',304:'GL',320:'GT',324:'GN',
        328:'GY',332:'HT',340:'HN',344:'HK',348:'HU',356:'IN',360:'ID',364:'IR',368:'IQ',372:'IE',376:'IL',380:'IT',
        392:'JP',398:'KZ',400:'JO',404:'KE',410:'KR',414:'KW',418:'LA',422:'LB',430:'LR',440:'LT',442:'LU',
        450:'MG',454:'MW',458:'MY',466:'ML',478:'MR',480:'MU',484:'MX',496:'MN',504:'MA',508:'MZ',524:'NP',
        528:'NL',554:'NZ',558:'NI',562:'NE',566:'NG',578:'NO',586:'PK',591:'PA',600:'PY',604:'PE',608:'PH',
        616:'PL',620:'PT',624:'GW',634:'QA',642:'RO',643:'RU',682:'SA',686:'SN',688:'RS',694:'SL',703:'SK',
        705:'SI',706:'SO',710:'ZA',716:'ZW',724:'ES',740:'SR',752:'SE',756:'CH',762:'TJ',764:'TH',784:'AE',
        788:'TN',792:'TR',800:'UG',804:'UA',807:'MK',818:'EG',840:'US',854:'BF',858:'UY',860:'UZ',862:'VE',
        704:'VN',887:'YE',894:'ZM',112:'BY',156:'CN',158:'TW',499:'ME',512:'OM',48:'BH',760:'SY',
      };

      const countries = topo.feature(geoData, geoData.objects.countries) as unknown as GeoJSON.FeatureCollection;
      const tooltip = tooltipRef.current!;

      svg.selectAll('.country')
        .data(countries.features)
        .join('path')
        .attr('d', pathGen as any)
        .attr('fill', (d: any) => {
          const cc = ISO[+d.id];
          if (!cc) return 'rgba(255,255,255,0.055)';
          if (mapType === 'source' && activeCountries.has(cc)) return 'rgba(0,212,255,0.32)';
          if (mapType === 'target' && allTargetCodes.includes(cc)) return 'rgba(245,158,11,0.28)';
          return 'rgba(255,255,255,0.055)';
        })
        .attr('stroke', (d: any) => {
          const cc = ISO[+d.id];
          if (!cc) return 'rgba(255,255,255,0.1)';
          if (mapType === 'source' && activeCountries.has(cc)) return '#00D4FF';
          if (mapType === 'target' && allTargetCodes.includes(cc)) return '#EA580B';
          return 'rgba(255,255,255,0.1)';
        })
        .attr('stroke-width', (d: any) => {
          const cc = ISO[+d.id];
          if (!cc) return 0.3;
          if (mapType === 'source' && activeCountries.has(cc)) return 0.8;
          if (mapType === 'target' && allTargetCodes.includes(cc)) return 0.6;
          return 0.3;
        })
        .style('cursor', 'pointer')
        .on('mousemove', function(event: MouseEvent, d: any) {
          const cc = ISO[+d.id];
          if (!cc) return;
          const c = countryData[cc];
          let html = '';
          if (mapType === 'source' && activeCountries.has(cc) && c) {
            html = `<strong style="color:#fff;display:block;margin-bottom:3px">${c.flag} ${c.name}</strong><span style="color:#94A3B8">🗣 ${c.lang}</span>`;
          } else if (mapType === 'target' && allTargetCodes.includes(cc) && c) {
            const z = getZone(cc);
            html = `<strong style="color:#fff;display:block;margin-bottom:3px">${c.flag} ${c.name}</strong><span style="color:#94A3B8;display:block">🗣 ${c.lang}</span><span style="display:inline-block;margin-top:4px;padding:2px 8px;border-radius:7px;font-size:11px;font-weight:700;background:${z.c}20;color:${z.c};border:1px solid ${z.c}40">${z.l} · ${z.r}</span>`;
          } else if (c) {
            html = `<strong style="color:#fff;display:block">${c.flag} ${c.name}</strong>`;
          }
          if (!html) return;
          tooltip.innerHTML = html;
          tooltip.style.opacity = '1';
          tooltip.style.left = (event.clientX + 16) + 'px';
          tooltip.style.top = (event.clientY - 60) + 'px';
        })
        .on('mouseleave', function() { tooltip.style.opacity = '0'; })
        .on('click', function(_: any, d: any) {
          const cc = ISO[+d.id];
          if (cc && onCountryClick) onCountryClick(cc);
        });

      // Border mesh
      svg.append('path')
        .datum(topo.mesh(geoData, geoData.objects.countries, (a: any, b: any) => a !== b))
        .attr('d', pathGen as any).attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.09)').attr('stroke-width', 0.3)
        .attr('pointer-events', 'none');
    }

    render();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCountries, mapType]);

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 900 460"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 999,
          background: 'rgba(4,7,14,0.97)', border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '12px', padding: '10px 14px', fontSize: '13px',
          backdropFilter: 'blur(16px)', opacity: 0, transition: 'opacity 0.1s',
          minWidth: '160px', maxWidth: '240px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
        }}
      />
    </div>
  );
}
