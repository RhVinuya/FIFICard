export const production = {
    "payment": {
      "live": true,
      "gcash": true,
      "paymongo": false,
      "stripe": true
    },
    "gateway": [
      {
        "currency": "PHP",
        "payments": [
          "STRIPE",
          "GCASH-MANUAL"
        ]
      },
      {
        "currency": "USD",
        "payments": [
          "STRIPE"
        ]
      },
      {
        "currency": "SGD",
        "payments": [
          "STRIPE"
        ]
      }
    ],
    "recipients": [
      {
        "main": "All"
      },
      {
        "main": "Mother",
        "others": [
          "Mom-to-Be"
        ]
      },
      {
        "main": "Father",
        "others": [
          "Dad-to-Be"
        ]
      },
      {
        "main": "Daughter"
      },
      {
        "main": "Son"
      },
      {
        "main": "Brother"
      },
      {
        "main": "Sister"
      },
      {
        "main": "Wife"
      },
      {
        "main": "Husband"
      },
      {
        "main": "Baby"
      },
      {
        "main": "Grandparents"
      },
      {
        "main": "Friend",
        "others": [
          "Best Friend"
        ]
      },
      {
        "main": "Work",
        "others": [
          "Boss",
          "Coach",
          "Co-Worker",
          "Colleague"
        ]
      },
      {
        "main": "Girlfriend"
      },
      {
        "main": "Boyfriend"
      },
      {
        "main": "Graduates"
      },
      {
        "main": "Teachers"
      },
      {
        "main": "Aunt"
      },
      {
        "main": "Uncle"
      },
      {
        "main": "Nephew"
      },
      {
        "main": "Niece"
      },
      {
        "main": "Cousin"
      },
      {
        "main": "Couple"
      }
    ],
    "recipientdefault": "All",
    "ads": {
      "thumb": {
        "enable": true,
        "images": [
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_thumb%2Fvideogen1.png?alt=media&token=ee6c7da9-fda2-4524-b494-64fdf5084fea",
            "title": "VideoGen",
            "linktype": "external",
            "url": "https://videogen.io/?fpr=egetinnz54"
          },
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_thumb%2Fvideogen2.png?alt=media&token=64626a28-fc2e-4a2c-b1ba-1f5f5d29fb64",
            "title": "VideoGen",
            "linktype": "external",
            "url": "https://videogen.io/?fpr=egetinnz54"
          }
        ]
      },
      "flash": {
        "enable": false,
        "images": [
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Greetings_Images%2Fads_flash%2Fpromo_discount2.gif?alt=media&token=913b4832-5482-4a77-ad9d-8551db1a0b9a",
            "title": "Discount Promo 50%",
            "linktype": "internal",
            "url": "/new/cards/all"
          }
        ]
      },
      "flashmobile": {
        "enable": false,
        "images": [
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_flash%2Fbirthday-mobile-banner-1.gif?alt=media&token=ef89d9f7-474b-40fa-8f57-cec58bd2c75f",
            "title": "Happy Birthday",
            "linktype": "internal",
            "url": "/cards/Birthday"
          }
        ]
      },
      "sticky": {
        "enable": true,
        "initial": 1,
        "minutes": 5,
        "images": [
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_footer%2Fegetinnz-banner.png?alt=media&token=a2da7480-4da4-44ea-9977-41147c25c9a7",
            "title": "eGetinnz",
            "linktype": "external",
            "url": "https://www.egetinnz.com"
          },
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_footer%2Ffibeigreetings-banner.png?alt=media&token=e29b6d8f-e052-4cec-b5fd-bedfae8a5dac",
            "title": "Fibei Greetings",
            "linktype": "external",
            "url": "https://fibeigreetings.com"
          },
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_footer%2Ffibeidigicards-banner.png?alt=media&token=63c057ce-4738-4ffa-82d4-6cec2c4563eb",
            "title": "Fibei Digicards",
            "linktype": "external",
            "url": "https://fibeidigicards.com"
          },
          {
            "image": "https://firebasestorage.googleapis.com/v0/b/fifi-greetings.appspot.com/o/Digicards_Images%2Fads_footer%2Ffsm-banner.png?alt=media&token=0d13ca68-c32a-4b17-8a40-c2ae9a36b466",
            "title": "Frontier Semiconductor",
            "linktype": "external",
            "url": "http://frontiersemi.com/center/home.php"
          }
        ]
      }
    },
    "discounts": [
      {
        "code": "VAL10",
        "value": 10,
        "disctype": "percent",
        "active": false,
        "event": "Valentine's Day",
        "type": "ecard"
      },
      {
        "code": "BIRTH10",
        "value": 10,
        "disctype": "percent",
        "active": false,
        "event": "Birthday",
        "type": "card"
      }
    ],
    "promos": [
      {
        "type": "discount on 2nd item",
        "title": "Buy One and Get a Second Card at 50% off",
        "start": "2025-04-01",
        "end": "2025-06-30",
        "discount": 50,
        "itemtype": "card"
      },
      {
        "type": "free on 2nd item",
        "title": "Buy Gift for a Free Card",
        "start": "2025-04-01",
        "end": "2025-06-30",
        "itemtype": "gift",
        "itemtypetag": "Buy Gift for a Free Card",
        "discountedtype": "card",
        "discountedtypetag": "Get this card for free when you purchase a gift from FiBei Products"
      }
    ],
    "priorities": [
      {
        "type": "card",
        "event": "Mother's day",
        "ids": [
          "5jfUZJGkqvYOeCKFyUWo",
          "hPi4eFEo4VcWzAw6Rq9g",
          "BpmEna17XhWoOfdOteWQ",
          "HD54rXnPCC07GZOcF01k",
          "LcAXP6v9cXQJ1it42Wwa",
          "We78UAXCMd7BuffSQ15e",
          "X1UIGf6fbemTfo1lmu1h",
          "n0mc6EjbcBvDOVx1YAoN"
        ]
      }
    ]
  }