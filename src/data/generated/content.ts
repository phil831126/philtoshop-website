/**
 * ⚠ 此檔由 scripts/content-files.mjs 自動產生，請勿手動修改。
 * 【負責功能】public/images/ 各資料夾 info.txt 的文字內容。要改網站文字，請改那些 info.txt。
 * 【何時更新】npm run dev 期間存檔 info.txt 時、npm run build、npm run photos 都會自動重新產生。
 */

export interface TextSection {
  title: string
  fields: Record<string, string>
}

export interface TextFile {
  fields: Record<string, string>
  sections: TextSection[]
}

export const textFiles: Record<string, TextFile> = {
  "": {
    "fields": {
      "網站名稱": "PHILTOSHOP",
      "副標": "PHOTOGRAPHY PORTFOLIO",
      "分頁標題": "PHILTOSHOP",
      "版權": "PHILTOSHOP",
      "Instagram": "",
      "Instagram顯示文字": "",
      "Email": ""
    },
    "sections": []
  },
  "about": {
    "fields": {
      "照片": "01.jpg",
      "照片描述": "Portrait of the photographer",
      "標題": "The unreserved version of you.",
      "理念": "[Placeholder] One or two sentences about what PHILTOSHOP looks for in a photograph — the light, the pace, the people.\n\n[Placeholder] How a session feels: quiet, unhurried, honest.",
      "自我介紹": "[Placeholder] A short introduction about the photographer goes here."
    },
    "sections": []
  },
  "home": {
    "fields": {
      "主照片": "hero.jpg",
      "主照片描述": "Photograph by Philtoshop",
      "主照片對焦": "40%",
      "標語": "Capturing every\nmoment, the\nunreserved\nversion of you.",
      "按鈕文字": "EXPLORE WORKS",
      "小卡小字": "01 / EMOTIONAL",
      "小卡大字": "Ordinary moments.",
      "小卡連結": "emotional",
      "精選標題": ""
    },
    "sections": [
      {
        "title": "精選 1",
        "fields": {
          "照片": "featured-emotional.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "35%",
          "編號": "01",
          "標題": "Emotional",
          "介紹": "Quiet moments,\nhonestly seen.",
          "連結": "emotional/quiet-light",
          "顯示": "是"
        }
      },
      {
        "title": "精選 2",
        "fields": {
          "照片": "featured-ordinary.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "中",
          "編號": "",
          "標題": "Ordinary",
          "介紹": "Small rituals and familiar rooms.",
          "連結": "ordinary",
          "顯示": "是"
        }
      },
      {
        "title": "精選 3",
        "fields": {
          "照片": "featured-monochrome.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "中",
          "編號": "02",
          "標題": "Monochrome",
          "介紹": "A study in light\nand silence.",
          "連結": "monochrome/grey-hours",
          "顯示": "是"
        }
      },
      {
        "title": "精選 4",
        "fields": {
          "照片": "featured-shore.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "30%",
          "編號": "03",
          "標題": "Shore",
          "介紹": "Where the sea\nmeets memory.",
          "連結": "shore/low-tide",
          "顯示": "是"
        }
      }
    ]
  },
  "works/emotional": {
    "fields": {
      "名稱": "Emotional",
      "介紹": "Three stories, quietly told.",
      "總覽介紹": "Quiet moments, honestly seen.",
      "總覽封面": "quiet-light/01",
      "順序": "1"
    },
    "sections": []
  },
  "works/emotional/after-the-rain": {
    "fields": {
      "標題": "After the Rain",
      "介紹": "City portraits in the calm after a downpour.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/emotional/between-us": {
    "fields": {
      "標題": "Between Us",
      "介紹": "Portraits by the coast, where distance feels closer.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/emotional/quiet-light": {
    "fields": {
      "標題": "Quiet Light",
      "介紹": "A portrait series in natural window light.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome": {
    "fields": {
      "名稱": "Monochrome",
      "介紹": "A study in light and silence.",
      "總覽介紹": "A study in light and silence.",
      "總覽封面": "",
      "順序": "3"
    },
    "sections": []
  },
  "works/monochrome/grey-hours": {
    "fields": {
      "標題": "Grey Hours",
      "介紹": "A study in light and silence.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/paper-light": {
    "fields": {
      "標題": "Paper Light",
      "介紹": "Black and white portraits, printed in memory.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/silent-branches": {
    "fields": {
      "標題": "Silent Branches",
      "介紹": "Winter branches against a pale sky.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary": {
    "fields": {
      "名稱": "Ordinary",
      "介紹": "Everyday light, kept close.",
      "總覽介紹": "Small rituals and familiar rooms.",
      "總覽封面": "",
      "順序": "4"
    },
    "sections": []
  },
  "works/ordinary/kitchen-window": {
    "fields": {
      "標題": "Kitchen Window",
      "介紹": "The light that arrives before anyone is awake.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary/morning-errands": {
    "fields": {
      "標題": "Morning Errands",
      "介紹": "Small walks, small rituals.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary/small-rooms": {
    "fields": {
      "標題": "Small Rooms",
      "介紹": "Everyday corners, honestly seen.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore": {
    "fields": {
      "名稱": "Shore",
      "介紹": "Where the sea meets memory.",
      "總覽介紹": "Where the sea meets memory.",
      "總覽封面": "",
      "順序": "5"
    },
    "sections": []
  },
  "works/shore/last-light-on-the-coast": {
    "fields": {
      "標題": "Last Light on the Coast",
      "介紹": "The final hour of a long day by the sea.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/low-tide": {
    "fields": {
      "標題": "Low Tide",
      "介紹": "Where the sea meets memory.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/salt-wind": {
    "fields": {
      "標題": "Salt Wind",
      "介紹": "Hair, coats and the wind off the water.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style": {
    "fields": {
      "名稱": "Style",
      "介紹": "Form, fabric and the quiet of a pose.",
      "總覽介紹": "Wardrobe, texture and composed light.",
      "總覽封面": "",
      "順序": "2"
    },
    "sections": []
  },
  "works/style/linen-and-shadow": {
    "fields": {
      "標題": "Linen & Shadow",
      "介紹": "Soft fabric, hard light, and the space between.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style/studio-hours": {
    "fields": {
      "標題": "Studio Hours",
      "介紹": "A short series made in a single afternoon.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style/wardrobe-notes": {
    "fields": {
      "標題": "Wardrobe Notes",
      "介紹": "Sample long description for layout testing: a longer paragraph that checks how the narrow text column wraps when an introduction runs to several lines, so the chapter still reads calmly.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/viscera": {
    "fields": {
      "名稱": "Viscera",
      "介紹": "Close, unguarded, unfiltered.",
      "總覽介紹": "Texture, tension and what is left unsaid.",
      "總覽封面": "",
      "順序": "6"
    },
    "sections": []
  },
  "works/viscera/pulse": {
    "fields": {
      "標題": "Pulse",
      "介紹": "Three frames, one heartbeat.",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/viscera/raw-edges": {
    "fields": {
      "標題": "Raw Edges",
      "介紹": "Texture, tension and what is left unsaid.",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/viscera/under-the-skin": {
    "fields": {
      "標題": "Under the Skin",
      "介紹": "Close, unguarded, and a little uncomfortable.",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  }
}

/** info.txt 中看不懂的寫法（開發模式會顯示在瀏覽器主控台） */
export const textProblems: { file: string; line: number; message: string }[] = []
