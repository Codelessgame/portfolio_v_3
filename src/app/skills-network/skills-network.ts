import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
  HostListener,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  effect
} from '@angular/core';
import { CommonModule, isPlatformBrowser, APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { TranslationService } from '../translation.service';
import * as echarts from 'echarts';

interface SkillLeaf {
  name: string;
  icon: string;
  color: string;
}

interface SkillBranch {
  nameKey: string;
  color: string;
  skills: SkillLeaf[];
}

@Component({
  selector: 'app-skills-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-network.html',
  styleUrl: './skills-network.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsNetwork implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: false })
  chartContainer!: ElementRef<HTMLDivElement>;

  private ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private chartInstance: echarts.ECharts | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private isDark = true;
  private mediaQueryList: MediaQueryList | null = null;
  private platformLocation = inject(PlatformLocation);

  t(key: string): string {
    return this.ts.t()(key);
  }

  private getIconUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const base = this.platformLocation.getBaseHrefFromDOM() || '/';
    const normalizedBase = base.endsWith('/') ? base : base + '/';
    return `${normalizedBase}${cleanPath}`;
  }

  // Branch data
  private branches: SkillBranch[] = [
    {
      nameKey: 'skills.cat_programming',
      color: '#1bc198',
      skills: [
        { name: 'Python', icon: '/assets/icons/skills/python.svg', color: '#3776AB' },
        { name: 'C++', icon: '/assets/icons/skills/cpp.svg', color: '#00599C' },
        { name: 'C', icon: '/assets/icons/skills/c.svg', color: '#A8B9CC' },
        { name: 'Angular', icon: '/assets/icons/skills/angular.svg', color: '#E0234E' },
        { name: 'TypeScript', icon: '/assets/icons/skills/typescript.svg', color: '#3178C6' },
        { name: 'JavaScript', icon: '/assets/icons/skills/javascript.svg', color: '#F7DF1E' }
      ]
    },
    {
      nameKey: 'skills.cat_hardware',
      color: '#ff6b00',
      skills: [
        { name: 'Autodesk Fusion 360', icon: '/assets/icons/skills/fusion360.svg', color: '#FF6B00' },
        { name: 'Blender', icon: '/assets/icons/skills/blender.svg', color: '#E87D0D' },
        { name: 'PrusaSlicer', icon: '/assets/icons/skills/prusaslicer.svg', color: '#ED6B21' },
        { name: 'KiCad EDA', icon: '/assets/icons/skills/kicad.svg', color: '#314CB0' },
        { name: 'Arduino IDE', icon: '/assets/icons/skills/arduino.svg', color: '#00979C' }
      ]
    },
    {
      nameKey: 'skills.cat_tools',
      color: '#a200ff',
      skills: [
        { name: 'Git', icon: '/assets/icons/skills/git.svg', color: '#F05032' },
        { name: 'GitHub', icon: '/assets/icons/skills/github.svg', color: '#6e5494' },
        { name: 'VS Code', icon: '/assets/icons/skills/vscode.svg', color: '#007ACC' },
        { name: 'Linux', icon: '/assets/icons/skills/linux.svg', color: '#FCC624' }
      ]
    },
    {
      nameKey: 'skills.cat_office',
      color: '#ffbe0b',
      skills: [
        { name: 'Microsoft 365', icon: '/assets/icons/skills/office365.svg', color: '#0078D4' },
        { name: 'Google Workspace', icon: '/assets/icons/skills/googleworkspace.svg', color: '#4285F4' }
      ]
    },
    {
      nameKey: 'skills.cat_other',
      color: '#00b4d8',
      skills: [
        { name: 'Canva', icon: '/assets/icons/skills/canva.svg', color: '#00C4CC' },
        { name: 'Krita', icon: '/assets/icons/skills/krita.svg', color: '#3BABFF' },
        { name: 'QGIS', icon: '/assets/icons/skills/qgis.svg', color: '#589632' }
      ]
    }
  ];

  constructor() {
    // Re-render chart data when language changes
    effect(() => {
      this.ts.currentLang();
      if (this.isBrowser && this.chartInstance) {
        this.updateChartOption();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initThemeListener();
    this.initChart();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mediaQueryList) {
      this.mediaQueryList.removeEventListener('change', this.onThemeChange);
    }
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  private initThemeListener(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDark = this.mediaQueryList.matches;
      this.mediaQueryList.addEventListener('change', this.onThemeChange);
    }
  }

  private onThemeChange = (e: MediaQueryListEvent) => {
    this.isDark = e.matches;
    if (this.chartInstance) {
      this.updateChartOption();
    }
  };

  private initChart(): void {
    if (!this.chartContainer) return;
    const container = this.chartContainer.nativeElement;

    // Use container dimensions or sensible fallbacks if DOM is still calculating
    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 640;

    this.chartInstance = echarts.init(container, null, {
      renderer: 'canvas',
      width,
      height
    });

    this.updateChartOption();

    // Ensure chart properly resizes after browser paints
    setTimeout(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }, 50);


    // Responsive auto-resize
    this.resizeObserver = new ResizeObserver(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    });
    this.resizeObserver.observe(container);
  }

  private buildTreeData(): any {
    return {
      name: '',
      isRoot: true,
      itemStyle: {
        color: '#1bc198',
        borderColor: this.isDark ? '#0f172a' : '#ffffff',
        borderWidth: 3,
        shadowBlur: 16,
        shadowColor: 'rgba(27, 193, 152, 0.6)'
      },
      label: {
        show: false // No name displayed at the center
      },
      symbolSize: 22,
      children: this.branches.map(branch => ({
        name: this.t(branch.nameKey),
        isCategory: true,
        itemStyle: {
          color: branch.color,
          borderColor: this.isDark ? '#0f172a' : '#ffffff',
          borderWidth: 2.5,
          shadowBlur: 14,
          shadowColor: branch.color + '77'
        },
        label: {
          show: false // Hide category text by default - reveal on hover
        },
        emphasis: {
          scale: 1.3,
          label: {
            show: false
          }
        },
        lineStyle: {
          color: branch.color,
          width: 2.5,
          curveness: 0.4
        },
        symbolSize: 26,
        children: branch.skills.map(skill => ({
          name: skill.name,
          categoryName: this.t(branch.nameKey),
          symbol: `image://${this.getIconUrl(skill.icon)}`,
          symbolSize: 36,
          itemStyle: {
            borderColor: 'transparent',
            borderWidth: 0,
            shadowBlur: 12,
            shadowColor: skill.color + '66'
          },
          label: {
            show: false // No text on leaf icons - reveal on hover
          },
          emphasis: {
            scale: true,
            label: {
              show: false
            }
          },
          lineStyle: {
            color: branch.color + '77',
            width: 1.8,
            curveness: 0.4
          }
        }))
      }))
    };
  }

  private updateChartOption(): void {
    if (!this.chartInstance) return;

    const treeData = this.buildTreeData();

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: this.isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: 'transparent',
        borderWidth: 0,
        textStyle: {
          color: this.isDark ? '#ffffff' : '#0f172a',
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13
        },
        extraCssText: 'box-shadow: 0 12px 30px rgba(0,0,0,0.22); border-radius: 10px; backdrop-filter: blur(10px); padding: 8px 14px;',
        formatter: (params: any) => {
          if (!params.data) return '';
          if (params.data.isRoot) return '';
          const name = params.data.name;
          if (params.data.isCategory) {
            return `<div style="font-weight: 700; font-size: 13.5px; color: ${params.data.itemStyle?.color || 'inherit'};">${name}</div>`;
          }
          const category = params.data.categoryName ? `<div style="font-size: 11px; opacity: 0.65; margin-bottom: 2px;">${params.data.categoryName}</div>` : '';
          return `<div>${category}<div style="font-weight: 700; font-size: 14px; letter-spacing: -0.01em;">${name}</div></div>`;
        }
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          layout: 'radial',
          symbol: 'circle',
          symbolSize: 24,
          top: '5%',
          bottom: '5%',
          left: '5%',
          right: '5%',
          initialTreeDepth: 2,
          animationDuration: 750,
          animationDurationUpdate: 500,
          roam: false,
          leaves: {
            label: {
              show: false
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true
        }
      ]
    };

    this.chartInstance.setOption(option, true);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }
}
