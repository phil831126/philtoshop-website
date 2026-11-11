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
      "Instagram": "@philtoshop",
      "Instagram顯示文字": "",
      "Email": "phil831126@gmail.com",
      "委託表單": "https://forms.gle/WpdXU6rro9XspFKd7",
      "委託表單顯示文字": "前往填寫"
    },
    "sections": []
  },
  "about": {
    "fields": {
      "照片": "01.jpg",
      "照片描述": "Portrait of the photographer",
      "標題": "捕捉每個瞬間，\n那個毫無保留的你",
      "副標": "Capturing every moment, the unreserved version of you.",
      "自我介紹": "嗨你好，我是台北攝影Phil，這邊是我的作品集。\n\n喜歡海的寬廣、天空的遼闊，映照出人類的渺小。\n對有質感的穿搭非常感興趣，希望捕捉到每個細節。\n\n個人偏好用照片呈現出隱藏在空氣、眼神中，那份沒能說出口的情緒。\n期許自己能拍到每個情緒背後的故事和靈魂。\n\n我喜歡美的東西，更喜歡美的故事，希望你也喜歡。\n如果有興趣合作，歡迎私訊IG、email或填寫委託表單！"
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
          "介紹": "What we never say\nfinds a place in the light.",
          "連結": "emotional/被遺忘之人",
          "顯示": "是"
        }
      },
      {
        "title": "精選 2",
        "fields": {
          "照片": "featured-style.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "30%",
          "編號": "02",
          "標題": "Style",
          "介紹": "The way you carry yourself\nspeaks before you do.",
          "連結": "style/Dark Game",
          "顯示": "是"
        }
      },
      {
        "title": "精選 3",
        "fields": {
          "照片": "featured-monochrome.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "中",
          "編號": "03",
          "標題": "Monochrome",
          "介紹": "Light traces the skin;\nshadow keeps the rest.",
          "連結": "monochrome/日常的勇氣",
          "顯示": "是"
        }
      },
      {
        "title": "精選 4",
        "fields": {
          "照片": "featured-ordinary.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "中",
          "編號": "04",
          "標題": "Ordinary",
          "介紹": "In the little things,\nwe feel what it means to be alive.",
          "連結": "ordinary",
          "顯示": "是"
        }
      },
      {
        "title": "精選 5",
        "fields": {
          "照片": "featured-shore.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "30%",
          "編號": "05",
          "標題": "Shore",
          "介紹": "The tide takes the footprints,\nbut leaves us the summer.",
          "連結": "shore/祈願之海",
          "顯示": "是"
        }
      },
      {
        "title": "精選 6",
        "fields": {
          "照片": "featured-viscera.jpg",
          "照片描述": "Photograph by Philtoshop",
          "對焦": "中",
          "編號": "06",
          "標題": "Viscera",
          "介紹": "A fragment of you, a depth without end.",
          "連結": "viscera/Under the Skin",
          "顯示": "是"
        }
      }
    ]
  },
  "works/emotional": {
    "fields": {
      "名稱": "Emotional",
      "介紹": "What we never say finds a place in the light.",
      "總覽介紹": "What we never say finds a place in the light.",
      "總覽封面": "被遺忘之人/01",
      "作品順序": "被遺忘之人\nRoom\nDaydream",
      "順序": "1"
    },
    "sections": []
  },
  "works/emotional/condition：stable": {
    "fields": {
      "標題": "condition：\nstable",
      "模特": "QQ",
      "IG": "https://www.instagram.com/yuscqq/",
      "日期": "2026/04",
      "介紹": "",
      "順序": "4",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/emotional/Daydream": {
    "fields": {
      "標題": "",
      "模特": "Yuga",
      "IG": "https://www.instagram.com/yw__figal.o/",
      "日期": "2026/02",
      "介紹": "",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/emotional/Room": {
    "fields": {
      "標題": "",
      "模特": "Chelsea",
      "IG": "https://www.instagram.com/8y.chelsea/",
      "日期": "2026/03",
      "介紹": "",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/emotional/被遺忘之人": {
    "fields": {
      "標題": "",
      "模特": "Hsin",
      "IG": "https://www.instagram.com/tabiwithsin/",
      "日期": "2026/02",
      "介紹": "",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome": {
    "fields": {
      "名稱": "Monochrome",
      "介紹": "Light traces the skin; shadow keeps the rest.",
      "總覽介紹": "Light traces the skin; shadow keeps the rest.",
      "總覽封面": "日常的勇氣/01",
      "作品順序": "日常的勇氣\nUnder The Light\n山海",
      "順序": "3"
    },
    "sections": []
  },
  "works/monochrome/Inside": {
    "fields": {
      "標題": "",
      "模特": "詩雅",
      "IG": "https://www.instagram.com/im_shihya/",
      "日期": "2026/05",
      "介紹": "",
      "順序": "6",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/Rebirth": {
    "fields": {
      "標題": "",
      "模特": "Hailey",
      "IG": "https://www.instagram.com/haileyxchou/",
      "日期": "2026/05",
      "介紹": "",
      "順序": "5",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/Room": {
    "fields": {
      "標題": "",
      "模特": "艾蜜莉",
      "IG": "https://www.instagram.com/em_chuuu0424/",
      "日期": "2026/07",
      "介紹": "",
      "順序": "4",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/Under The Light": {
    "fields": {
      "標題": "",
      "模特": "Kathleen",
      "IG": "https://www.instagram.com/kathleen_0921/",
      "日期": "2026/02",
      "介紹": "",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/山海": {
    "fields": {
      "標題": "",
      "模特": "吉恩",
      "IG": "https://www.instagram.com/aji_lil.sunshine/",
      "日期": "2026/04",
      "介紹": "",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/monochrome/日常的勇氣": {
    "fields": {
      "標題": "",
      "模特": "葉菜類",
      "IG": "https://www.instagram.com/veggingout___/",
      "日期": "2026/03",
      "介紹": "",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary": {
    "fields": {
      "名稱": "Ordinary",
      "介紹": "In the little things, we feel what it means to be alive.",
      "總覽介紹": "In the little things, we feel what it means to be alive.",
      "總覽封面": "黄金の瞬間/11",
      "作品順序": "黄金の瞬間\nLife\nSmall Rooms",
      "順序": "4"
    },
    "sections": []
  },
  "works/ordinary/Life": {
    "fields": {
      "標題": "",
      "模特": "Lydia",
      "IG": "https://www.instagram.com/thelydgirl/",
      "日期": "2026/03",
      "介紹": "",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary/Small Rooms": {
    "fields": {
      "標題": "",
      "模特": "",
      "IG": "",
      "日期": "",
      "介紹": "",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/ordinary/黄金の瞬間": {
    "fields": {
      "標題": "",
      "模特": "Yuci",
      "IG": "https://www.instagram.com/yuci_shashin_/",
      "日期": "2025/12",
      "介紹": "",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore": {
    "fields": {
      "名稱": "Shore",
      "介紹": "The tide takes the footprints, but leaves us the summer.",
      "總覽介紹": "The tide takes the footprints, but leaves us the summer.",
      "總覽封面": "祈願之海/11",
      "作品順序": "祈願之海\n與你有關的一切\n夏末之詩",
      "順序": "5"
    },
    "sections": []
  },
  "works/shore/Summer Blue": {
    "fields": {
      "標題": "",
      "模特": "Connie",
      "IG": "https://www.instagram.com/connie_yuseong/",
      "日期": "2026/08",
      "介紹": "",
      "順序": "5",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/一生想望": {
    "fields": {
      "標題": "",
      "模特": "阿干",
      "IG": "https://www.instagram.com/pg_gan/",
      "日期": "2026/06",
      "介紹": "",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/夏末之詩": {
    "fields": {
      "標題": "",
      "模特": "小袋、小鄭",
      "IG": "https://www.instagram.com/1.chen33/、https://www.instagram.com/eee_ttttttttt/",
      "日期": "2025/08",
      "介紹": "",
      "順序": "3",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/祈願之海": {
    "fields": {
      "標題": "",
      "模特": "Chelsea",
      "IG": "https://www.instagram.com/8y.chelsea/",
      "日期": "2025/12",
      "介紹": "",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/shore/與你有關的一切": {
    "fields": {
      "標題": "",
      "模特": "小袋、橘子",
      "IG": "https://www.instagram.com/1.chen33/、https://www.instagram.com/chenyu_cha_o/",
      "日期": "2025/12",
      "介紹": "",
      "順序": "4",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style": {
    "fields": {
      "名稱": "Style",
      "介紹": "The way you carry yourself speaks before you do.",
      "總覽介紹": "The way you carry yourself speaks before you do.",
      "總覽封面": "Dark Game/01",
      "作品順序": "Dark Game\n自白\n凝視之後",
      "順序": "2"
    },
    "sections": []
  },
  "works/style/Dark Game": {
    "fields": {
      "標題": "",
      "模特": "崔西",
      "IG": "https://www.instagram.com/babyzihyu/",
      "日期": "2026/03",
      "介紹": "",
      "順序": "1",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style/凝視之後": {
    "fields": {
      "標題": "",
      "模特": "黛比",
      "IG": "https://www.instagram.com/wt_f_y_1013/",
      "日期": "2026/04",
      "介紹": "",
      "順序": "4",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  },
  "works/style/自白": {
    "fields": {
      "標題": "",
      "模特": "QQ",
      "IG": "https://www.instagram.com/yuscqq/",
      "日期": "2026/03",
      "介紹": "",
      "順序": "2",
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
      "總覽封面": "Under the Skin/01",
      "作品順序": "Under the Skin\nPulse\nRaw Edges",
      "順序": "6"
    },
    "sections": []
  },
  "works/viscera/Pulse": {
    "fields": {
      "標題": "",
      "模特": "",
      "IG": "",
      "日期": "",
      "介紹": "",
      "順序": "2",
      "封面": "",
      "顯示": "是"
    },
    "sections": []
  }
}

/** info.txt 中看不懂的寫法（開發模式會顯示在瀏覽器主控台） */
export const textProblems: { file: string; line: number; message: string }[] = []
