/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var rangeID, canvasID, annoID, imageID = 1;
var annoListID = 5;
var currentLeaf = "";
var alpha, beta, zeta = false;
var annoListCollection = new Array(3);
var testLists = [
    {
        "@type" : "sc:AnnotationList",
        "on" : "http://www.example.org/iiif/LlangBrev/range/25", //January leaf
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" :"http://www.example.org/iiif/LlangBrev/annoList/3",
        "resources" : "[{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce6dee4b0f1c678d2a54c\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"General Metadata\",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"qwertyuuiio\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce6dee4b0f1c678d2a54b\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"Institution or Repository: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"qqqq\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce6dee4b0f1c678d2a54d\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"Date: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"wwww\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce6dee4b0f1c678d2a54e\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"Language:  \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"eeee\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"}]"
    },
    {
        "@type" : "sc:AnnotationList",
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/1", //january leaf canvas 1
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" : "http://www.example.org/iiif/LlangBrev/annoList/1",
        "resources" : "[{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce6f3e4b0f1c678d2a550\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"Place Of Origin: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"ssss\"},\"on\":\"http://www.example.org/iiif/LlangBrev/canvas/1\"}]"
    },
    {
        "@type" : "sc:AnnotationList",
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/2", //january leaf canvas 2
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" : "http://www.example.org/iiif/LlangBrev/annoList/2",
        "resources" : "[{\"@id\":\"http://165.134.241.141/annotationstore/annotation/554ce707e4b0f1c678d2a554\",\"@type\":\"oa:Annotation\",\"motivation\":\"sc:painting\",\"label\":\"Format (single leaf, half bifolium, fragment): \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"xxxxx\"},\"on\":\"http://www.example.org/iiif/LlangBrev/canvas/2\"}]"
    }       
];
annoListCollection[0] = testLists[0];
annoListCollection[1] = testLists[1];
annoListCollection[2] = testLists[2];
var serverCanvasID = -1;
var serverAnnoID = -1;
var currentLeafServerID = -1;

var pageCanvases = [];
var allLeaves = [];
var testManifest = {
    "@context" : "http://iiif.io/api/presentation/2/context.json",
    "@id" : "",
    "@type" : "sc:Manifest",
    "label" : "Llang Binder",
    "sequences" : [{
      "@id" : "http://www.example.org/iiif/LlangBrev/sequence/normal",
      "@type" : "sc:Sequence",
      "label" : "Llangantock Bucket",
      "canvases" : [{
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor",
          "@type" : "sc:Canvas",
          "label" : "Llang_001",
          "height" : 1000,
          "width" : 667,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.example.org/iiif/LlangBrev/image_001",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":[],
         },
         {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/1",
          "@type" : "sc:Canvas",
          "label" : "January Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [
          {
               "@type" : "oa:Annotation",
               "motivation" : "sc:painting",
               "resource" : {
                 "@id" : "http://www.yoyowall.com/wp-content/uploads/2013/03/Abstract-Colourful-Cool.jpg",
                 "@type" : "dctypes:Image",
                 "format" : "image/jpeg",
                 "height" : 2365,
                 "width" : 1579
               },
               "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
          }
          ],
          "otherContent":["http://www.example.org/iiif/LlangBrev/annoList/1"]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/2",
          "@type" : "sc:Canvas",
          "label" : "January Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://funlava.com/wp-content/uploads/2013/03/cool-hd-wallpapers.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
          }],
          "otherContent":["http://www.example.org/iiif/LlangBrev/annoList/2"]
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/3",
          "@type" : "sc:Canvas",
          "label" : "February Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRYZAj0K5SiHcZonHG--GrygYLgnjhSXX35BfapUckYLB7fKYI",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/3"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/4",
          "@type" : "sc:Canvas",
          "label" : "February Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://i.huffpost.com/gen/1719761/images/o-COOL-CAT-facebook.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/4"
          }],
          "otherContent":["http://www.example.org/iiif/LlangBrev/annoList/1"]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/5",
          "@type" : "sc:Canvas",
          "label" : "March Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://cloud-4.steamusercontent.com/ugc/43108316458046990/EC4110525593F4CC213E69257ABE6F0BE1D18D9A/",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/5"
          }],
          "otherContent":[]
         
   },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/6",
          "@type" : "sc:Canvas",
          "label" : "March Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.hdwallpaperscool.com/wp-content/uploads/2014/06/amazing-backgrounds-cool-wallpapers-of-high-resolution.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/6"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/7",
          "@type" : "sc:Canvas",
          "label" : "April Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t3.gstatic.com/images?q=tbn:ANd9GcR-CUW-EqZ7WboySAFm_3oQH9xLbxZsSHu2EyPsQ8gCObts0-nJ",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/7"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/8",
          "@type" : "sc:Canvas",
          "label" : "April Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t1.gstatic.com/images?q=tbn:ANd9GcQM3TBh35_znmOW65GdTY1u6WZCa5smnvv_s1nIJl355iaqIBeVGg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/8"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/9",
          "@type" : "sc:Canvas",
          "label" : "May Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.darveshtv.com/wp-content/uploads/2015/02/cool_car_3d_wallpapers_hot.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/9"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/10",
          "@type" : "sc:Canvas",
          "label" : "May Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://ajournalofmusicalthings.com/wp-content/uploads/Cool.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/10"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/11",
          "@type" : "sc:Canvas",
          "label" : "June Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/2/20/Cool,_Calif_sign.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/11"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/12",
          "@type" : "sc:Canvas",
          "label" : "June Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t1.gstatic.com/images?q=tbn:ANd9GcT_cVgwB1vOupPsjjiGbnPrkK24fpq9BThi3fkVNrgoX0oMNwzv0w",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/12"
          }],
          "otherContent":[],      
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/13",
          "@type" : "sc:Canvas",
          "label" : "Advent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t0.gstatic.com/images?q=tbn:ANd9GcTLM1VY3Ehp3F1hd78mrszS3euO32XV-BjtgXaaKNcRJ8je3ECmZg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/13"
          }],
          "otherContent":[],       
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/14",
          "@type" : "sc:Canvas",
          "label" : "Advent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://browsewallpaper.com/wp-content/uploads/2014/11/cool%20designs%20wallpaper-cKAa.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/14"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/15",
          "@type" : "sc:Canvas",
          "label" : "Epiphany_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.desktopaper.com/wp-content/uploads/great-cool-design-backgrounds.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/15"
          }],
          "otherContent":[],      
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/16",
          "@type" : "sc:Canvas",
          "label" : "Epiphany_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Haliaeetus_leucocephalus_-Skagit_valley-8-2c.jpg/300px-Haliaeetus_leucocephalus_-Skagit_valley-8-2c.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/16"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/17",
          "@type" : "sc:Canvas",
          "label" : "Pre-Lent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.chicagonow.com/greenamajigger/files/2013/04/bee-eater_1627477i.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/17"
          }],
          "otherContent":[],       
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/18",
          "@type" : "sc:Canvas",
          "label" : "Pre-Lent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.arizonafoothillsmagazine.com/images/stories/aug13/Butterfly_Blue.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/18"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/19",
          "@type" : "sc:Canvas",
          "label" : "Ascension_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Butterflies_%28Costa_Rica%29.jpg/800px-Butterflies_%28Costa_Rica%29.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/19"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/20",
          "@type" : "sc:Canvas",
          "label" : "Ascension_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.slu.edu/Images/marketing_communications/logos/slu/slu_2c.bmp",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/20"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/21",
          "@type" : "sc:Canvas",
          "label" : "Pentecost_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://vaccinenewsdaily.com/wp-content/uploads/2015/01/SLU_Vert_blue.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/21"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/22",
          "@type" : "sc:Canvas",
          "label" : "Pentecost_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://rbrua3v80lj2rulsf7iqfnpmf.wpengine.netdna-cdn.com/wp-content/uploads/2014/10/St_Louis_Blues3.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/22"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/23",
          "@type" : "sc:Canvas",
          "label" : "Pentecost After Advent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.sports-logos-screensavers.com/user/St_Louis_Blues4.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/23"
          }],
          "otherContent":[],
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/24",
          "@type" : "sc:Canvas",
          "label" : "Pentecost After Advent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://p1.pichost.me/i/39/1623860.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/24"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/25",
          "@type" : "sc:Canvas",
          "label" : "Psalms 1-6",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/26",
          "@type" : "sc:Canvas",
          "label" : "Psalms 6-11",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/27",
          "@type" : "sc:Canvas",
          "label" : "Psalms 41-46",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/28",
          "@type" : "sc:Canvas",
          "label" : "Psalms 46-50",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/29",
          "@type" : "sc:Canvas",
          "label" : "Psalms 51-56",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/30",
          "@type" : "sc:Canvas",
          "label" : "Psalms 56-61",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/31",
          "@type" : "sc:Canvas",
          "label" : "Psalms 91-96",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/32",
          "@type" : "sc:Canvas",
          "label" : "Psalms 96-100",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/33",
          "@type" : "sc:Canvas",
          "label" : "Psalms 101-107",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/34",
          "@type" : "sc:Canvas",
          "label" : "Psalms 106-111",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/35",
          "@type" : "sc:Canvas",
          "label" : "Psalms 141-14150",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/36",
          "@type" : "sc:Canvas",
          "label" : "Psalms 146-150",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/37",
          "@type" : "sc:Canvas",
          "label" : "Apostles_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/38",
          "@type" : "sc:Canvas",
          "label" : "Apostles_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/39",
          "@type" : "sc:Canvas",
          "label" : "Virgins_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/40",
          "@type" : "sc:Canvas",
          "label" : "Virgins_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/41",
          "@type" : "sc:Canvas",
          "label" : "Andrew_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/42",
          "@type" : "sc:Canvas",
          "label" : "Andrew_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/43",
          "@type" : "sc:Canvas",
          "label" : "Petronilla_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/44",
          "@type" : "sc:Canvas",
          "label" : "Pertonilla_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/45",
          "@type" : "sc:Canvas",
          "label" : "Marcellinus_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/46",
          "@type" : "sc:Canvas",
          "label" : "Marcellinus_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/45",
          "@type" : "sc:Canvas",
          "label" : "Saturinus_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/46",
          "@type" : "sc:Canvas",
          "label" : "Saturinus_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/47",
          "@type" : "sc:Canvas",
          "label" : "OOV_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/48",
          "@type" : "sc:Canvas",
          "label" : "OOV_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/49",
          "@type" : "sc:Canvas",
          "label" : "OOD_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/50",
          "@type" : "sc:Canvas",
          "label" : "OOD_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/51",
          "@type" : "sc:Canvas",
          "label" : "misc_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/52",
          "@type" : "sc:Canvas",
          "label" : "misc_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/55",
          "@type" : "sc:Canvas",
          "label" : "SLU_VFL_MS_002_fol_b_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://localhost:8080/brokenBooks/images/SLU_VFL_MS_002_fol_b_r.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":["http://www.example.org/iiif/LlangBrev/annoList/4"]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/56",
          "@type" : "sc:Canvas",
          "label" : "SLU_VFL_MS_002_fol_b_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://localhost:8080/brokenBooks/images/SLU_VFL_MS_002_fol_b_v.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":["http://www.example.org/iiif/LlangBrev/annoList/5"]
         
    },
    ]
}], 
"structures" : [

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/parent_aggr",
  "@type":"sc:Range",
  "label":"Llangantock Breviary Structure",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/1",
      "http://www.example.org/iiif/LlangBrev/range/2",
      "http://www.example.org/iiif/LlangBrev/range/3",
      "http://www.example.org/iiif/LlangBrev/range/4",
      "http://www.example.org/iiif/LlangBrev/range/21",
      "http://www.example.org/iiif/LlangBrev/range/5"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},    
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/1",
  "@type":"sc:Range",
  "label":"Calendar",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/7",
      "http://www.example.org/iiif/LlangBrev/range/8",
      "http://www.example.org/iiif/LlangBrev/range/9",
      "http://www.example.org/iiif/LlangBrev/range/10",
      "http://www.example.org/iiif/LlangBrev/range/11",
      "http://www.example.org/iiif/LlangBrev/range/12"
      //add leaf ranges here in order for page order
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{ //A connection of content can be made like this, but not fragments
  "@id":"http://www.example.org/iiif/LlangBrev/range/2",
  "@type":"sc:Range",
  "label":"Temporale",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/13",
      "http://www.example.org/iiif/LlangBrev/range/14",
      "http://www.example.org/iiif/LlangBrev/range/15",
      "http://www.example.org/iiif/LlangBrev/range/53"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{//A connection of content can be made like this, but not fragments
  "@id":"http://www.example.org/iiif/LlangBrev/range/3",
  "@type":"sc:Range",
  "label":"Psalter",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/16",
      "http://www.example.org/iiif/LlangBrev/range/17",
      "http://www.example.org/iiif/LlangBrev/range/18"
      //add leaf ranges here in order for page order
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},


{
  "@id":"http://www.example.org/iiif/LlangBrev/range/4",
  "@type":"sc:Range",
  "label":"Sanctorale",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/19",
      "http://www.example.org/iiif/LlangBrev/range/20",
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/5",
  "@type":"sc:Range",
  "label":"Auxilary Texts",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/22",
      "http://www.example.org/iiif/LlangBrev/range/23",
      "http://www.example.org/iiif/LlangBrev/range/24"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},


{
  "@id":"http://www.example.org/iiif/LlangBrev/range/7",
  "@type":"sc:Range",
  "label":"January",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/25"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/8",
  "@type":"sc:Range",
  "label":"February",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/26"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/9",
  "@type":"sc:Range",
  "label":"March",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/27"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/10",
  "@type":"sc:Range",
  "label":"April",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/28"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/11",
  "@type":"sc:Range",
  "label":"May",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/29"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/12",
  "@type":"sc:Range",
  "label":"June",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/30"
   ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
}, //EX: we know this is the last section.  Here are 4 pages we know are in it.  It is not inside the table of contents array.

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/13",
  "@type":"sc:Range",
  "label":"Advent - Epiphany",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/31", 
    "http://www.example.org/iiif/LlangBrev/range/32"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/14",
  "@type":"sc:Range",
  "label":"Pre-Lent through Ascension",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/33", 
    "http://www.example.org/iiif/LlangBrev/range/34"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/15",
  "@type":"sc:Range",
  "label":"Pentecost to Advent",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/35", 
    "http://www.example.org/iiif/LlangBrev/range/36"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/16",
  "@type":"sc:Range",
  "label":"Psalms 1-50",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/37", 
    "http://www.example.org/iiif/LlangBrev/range/38"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/17",
  "@type":"sc:Range",
  "label":"Psalms 51-100",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/39", 
      "http://www.example.org/iiif/LlangBrev/range/40"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/18",
  "@type":"sc:Range",
  "label":"Psalms 101-150",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/41", 
      "http://www.example.org/iiif/LlangBrev/range/42"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/19",
  "@type":"sc:Range",
  "label":"Andrew (Nov 30)-Petronilla(May31)",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/46",
      "http://www.example.org/iiif/LlangBrev/range/47"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/20",
  "@type":"sc:Range",
  "label":"Marcellinus (June 2)–Satirinus(Nov 29)",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/48",
      "http://www.example.org/iiif/LlangBrev/range/49"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/21",
  "@type":"sc:Range",
  "label":"Common of Saints",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/43"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/22",
  "@type":"sc:Range",
  "label":"Office of the Virgin",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/50"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/23",
  "@type":"sc:Range",
  "label":"Office of the Dead",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/51"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/24",
  "@type":"sc:Range",
  "label":"Miscellaneous",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/52"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/25",
  "@type":"sc:Range",
  "label":"January Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/1","http://www.example.org/iiif/LlangBrev/canvas/2"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : ["http://www.example.org/iiif/LlangBrev/annoList/3"]
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/26",
  "@type":"sc:Range",
  "label":"February Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/3","http://www.example.org/iiif/LlangBrev/canvas/4"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/27",
  "@type":"sc:Range",
  "label":"March Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/5","http://www.example.org/iiif/LlangBrev/canvas/6"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/28",
  "@type":"sc:Range",
  "label":"April Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/7","http://www.example.org/iiif/LlangBrev/canvas/8"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/29",
  "@type":"sc:Range",
  "label":"May Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/9","http://www.example.org/iiif/LlangBrev/canvas/10"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/30",
  "@type":"sc:Range",
  "label":"June Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/11","http://www.example.org/iiif/LlangBrev/canvas/12"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/31",
  "@type":"sc:Range",
  "label":"Advent Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/13","http://www.example.org/iiif/LlangBrev/canvas/14"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/32",
  "@type":"sc:Range",
  "label":"Epiphany Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/15","http://www.example.org/iiif/LlangBrev/canvas/16"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/33",
  "@type":"sc:Range",
  "label":"Pre-Lent Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/17","http://www.example.org/iiif/LlangBrev/canvas/18"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/34",
  "@type":"sc:Range",
  "label":"Ascension Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/19","http://www.example.org/iiif/LlangBrev/canvas/20"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/35",
  "@type":"sc:Range",
  "label":"Pentecost Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/21","http://www.example.org/iiif/LlangBrev/canvas/22"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/36",
  "@type":"sc:Range",
  "label":"Advent After Pentecost Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/23","http://www.example.org/iiif/LlangBrev/canvas/24"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/37",
  "@type":"sc:Range",
  "label":"Psalms 1-11 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/25","http://www.example.org/iiif/LlangBrev/canvas/26"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/38",
  "@type":"sc:Range",
  "label":"Psalms 41-50 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/27","http://www.example.org/iiif/LlangBrev/canvas/28"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/39",
  "@type":"sc:Range",
  "label":"Psalms 51-61 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/29","http://www.example.org/iiif/LlangBrev/canvas/30"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/40",
  "@type":"sc:Range",
  "label":"Psalms 91-100 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/31","http://www.example.org/iiif/LlangBrev/canvas/32"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/41",
  "@type":"sc:Range",
  "label":"Psalms 101-111 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/33","http://www.example.org/iiif/LlangBrev/canvas/34"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/42",
  "@type":"sc:Range",
  "label":"Psalms 141-150 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/35","http://www.example.org/iiif/LlangBrev/canvas/36"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/43",
  "@type":"sc:Range",
  "label":"Apostles, Martyrs, Confessors, Virgins",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/44",
      "http://www.example.org/iiif/LlangBrev/range/45"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/44",
  "@type":"sc:Range",
  "label":"Apostles Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/37","http://www.example.org/iiif/LlangBrev/canvas/38"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/45",
  "@type":"sc:Range",
  "label":"Virgins Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/39","http://www.example.org/iiif/LlangBrev/canvas/40"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/46",
  "@type":"sc:Range",
  "label":"Andrew Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/41","http://www.example.org/iiif/LlangBrev/canvas/42"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/47",
  "@type":"sc:Range",
  "label":"Petronilla Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/43","http://www.example.org/iiif/LlangBrev/canvas/44"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/48",
  "@type":"sc:Range",
  "label":"Marcellinus Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/45","http://www.example.org/iiif/LlangBrev/canvas/46"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/49",
  "@type":"sc:Range",
  "label":"Saturinus Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/47","http://www.example.org/iiif/LlangBrev/canvas/48"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/50",
  "@type":"sc:Range",
  "label":"Office of the Virgin Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/49","http://www.example.org/iiif/LlangBrev/canvas/50"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/51",
  "@type":"sc:Range",
  "label":"Office of the Dead Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/51","http://www.example.org/iiif/LlangBrev/canvas/52"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/52",
  "@type":"sc:Range",
  "label":"Miscellaneous Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/53","http://www.example.org/iiif/LlangBrev/canvas/54"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/53",
  "@type":"sc:Range",
  "label":"Demo Test Leaf",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/55","http://www.example.org/iiif/LlangBrev/canvas/56"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
}

]
};

var rangeCollection = testManifest.structures;
var pageCanvases = testManifest.sequences[0].canvases;
var annotationLists = [
    {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/1",
      "@type" : "sc:AnnotationLists",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/1",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "BB Identifier",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_LLang_01"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/2",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Nickname",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Bryan's test"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/3",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Date Acquired",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "6/12/15"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        }
      ],
      "on" :  "http://www.example.org/iiif/LlangBrev/canvas/1"//end resources
  },

  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/2",
      "@type" : "sc:AnnotationLists",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/4",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Place Of Origin",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "St. Louis"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/5",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Condition",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Deplorable"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/6",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Illustrations",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Smiley Face Doodles"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/3",
      "@type" : "sc:AnnotationLists",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/7",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "General Metadata",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "This is the very first leaf in the breviary.  An interesting face is that Leonardo da Vinci created it, which makes no sense."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/8",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Title",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Suspected da Vinci Writings"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/9",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Other Content Info",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "It takes up a much smaller portion of the page than usual."
          },
         "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/range/25"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/4",
      "@type" : "sc:AnnotationLists",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/10",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "BB Identifier",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_Llang_003_r"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
         {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/11",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Institution or Repository",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Saint Louis University"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/12",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Shelfmark",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "SLU VFL MS 002, fol. b, recto"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/13",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Date Acquired",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/14",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Provenance",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Milton& Gail Fischmann, 1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/15",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Bibliography",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Evans, E.S. \"Medieval manuscripts at Saint Louis University: a catalogue,\" in Manuscripta 47/48 (2003/2004), p. 56-64."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/16",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Language",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Latin"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/17",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Subject",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Catholic Church, Liturgy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/18",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Title (refers to contents)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Feast of Holy Innocents (Dec 28), Matins, Lessons 4-7"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/19",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Incipit",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "[Et ideo dignum...fuit causa]//p[o]ene, qui extitit et corone, ip[s]e odii c[aus]a qui p[rae]mii ..."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/19",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Date",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1441-1448"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/20",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Place Of Origin",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Ferrara, Italy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/21",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Format (single leaf, half bifolium, fragment)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Single leaf"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/22",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Dimensions",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "275 x 200 (170 x 130) mm"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/23",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Columns",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/24",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Lines",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "30"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/25",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Script",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Gothic textualis rotunda"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/26",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Decorations",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "4 two-line initials, two vertical bar extensions terminating in floral and foliate forms"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/27",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Artist(s)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Giorgio d'Alemagna (active 1441-1479) and others"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/5",
      "@type" : "sc:AnnotationLists",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/29",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "BB Identifier",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_Llang_003_v"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
         {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/30",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Institution or Repository",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Saint Louis University"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/31",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Shelfmark",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "SLU VFL MS 002, fol. b, verso"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/32",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Date Acquired",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/33",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Provenance",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Milton& Gail Fischmann, 1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/34",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Bibliography",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Evans, E.S. \"Medieval manuscripts at Saint Louis University: a catalogue,\" in Manuscripta 47/48 (2003/2004), p. 56-64."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/35",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Language",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Latin"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/36",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Subject",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Catholic Church, Liturgy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/37",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Title (refers to contents)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Feast of Holy Innocents (Dec 28), Matins, Lessons 7-9, Laud"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/38",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Explicit",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Cum rel[iquis] a[n]t[iphona]. A bymatu et infra occidit multos pueros hero//[des propter "
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/39",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Date",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1441-1448"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/40",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Place Of Origin",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Ferrara, Italy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/41",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Format (single leaf, half bifolium, fragment)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Single leaf"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/42",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Dimensions",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "275 x 200 (170 x 130) mm"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/43",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Columns",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/44",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Lines",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "30"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/45",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Script",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Gothic textualis rotunda"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/46",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Decorations",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2 two-line initials, two vertical bar extensions terminating in floral and foliate forms"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/47",
          "@type" : "oa:Annotation",
          "motivation" : "sc:painting",
          "resource" : {
            "label" : "Artist(s)",
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Giorgio d'Alemagna (active 1441-1479) and others"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        }],
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
  //Everything above this fits into the January leaf (and its canvases.)
        }] // end lists;

function getAllRanges(){
  //THERE WILL AT LEAST BE ONE RANGE
  var properties={"@type" : "sc:Range"};
  var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
  var params = {"content" : JSON.stringify(properties)};
  console.log("GET RANGES LIVE");
  $.post(url, params, function(data){
     console.log("Got ranges");
     rangeCollection = JSON.parse(data);
     getAllCanvases();
  });
}

function getAllAnnotations(){
  //THERE MAY BE NO ANNOTATIONS
  var properties={"@type" : "sc:AnnotationList"};
  var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet"
  var params = {"content" : JSON.stringify(properties)};
  $.post(url, params, function(data){
     annotationLists = JSON.parse(data);
     console.log("Got annotations");
     organizeRanges();
  });
}

function getAllCanvases(){
  //THERE WILL AT LEAST BE 2 CANVASES
  var properties={"@type" : "sc:Canvas"};
  var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet"
  var params = {"content" : JSON.stringify(properties)};
  $.post(url, params, function(data){
     pageCanvases = JSON.parse(data);
     console.log("got canvases")
     getAllAnnotations();
  });
}

function toggleChildren(parentRange, admin, event){
  var outer= '';
    if(admin == "admin"){
        outer = $(".adminTrail");
    }
    else{
        outer = $(".popoverTrail");

    }
  if(event !== undefined && event.target.className.indexOf("putInGroup") > -1 || event.target.className.indexOf("leafIcon") > -1){ //detect if they clicked the checkbox or leaf icon.
    return false;
  }
  var children = [];
  if(parentRange.children(".parent").length > 0){ //if they are moving from the first set, they are parents and not children
      children = parentRange.children(".parent");
  }
  else{
      children = parentRange.children(".child");
  }
  
  var dropAttribute = "";
  var relation = parentRange.attr("rangeID");
  var unassigned = parentRange.hasClass('unassigned');
  var intendedDepth = -1;
  var newAreaLabel = parentRange.children("span:first").html();
  if(newAreaLabel == "Unassigned"){
    var extra = parentRange.parent().children(".rAreaLabel").html();
    newAreaLabel = "Unordered Leaves From <br>"+extra;
  }
  var labelHTML = '<div class="rAreaLabel">'+newAreaLabel+'</div>';
  var actualDepth = parseInt(outer.find(".rangeArrangementArea").length);
  var sortOrder = "";
  var extraButtons = '<input class="makeGroup" value="Group" type="button" onclick="askForNewTitle($(this).parent());"/>\n\
                    <input class="addGroup" value="Add" type="button" onclick="newGroupForm($(this).parent());"/>\n\
                    <input class="makeSortable" value="Sort" type="button" onclick="makeSortable($(this).parent());"/>\n\
                    <input class="doneSortable" value="Done" type="button" onclick="stopSorting($(this).parent());"/>';
  if(admin === "admin"){
      dropAttribute = "ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
      sortOrder = " sortOrder";
  }
  else{
      sortOrder = "";
      dropAttribute = "";
  }
  if(unassigned){
    intendedDepth = parseInt(parentRange.parent().attr("depth")) + 1;
  }
  else{
    intendedDepth = parseInt(parentRange.parent().parent().attr("depth")) + 1;
  }
  var newArea = $("<div  depth='"+intendedDepth+"' relation='"+relation+"' rangeID='"+relation+"' class='rangeArrangementArea'>"+labelHTML+"<div "+dropAttribute+" class='notBucket'></div></div>");
  var newAreaBucket = $('<div onclick=\'toggleChildren($(this), "admin", event);\' '+dropAttribute+' rangeID="'+relation+'"" class="arrangeSection parent unassigned '+sortOrder+'"><span>Unassigned</span></div>'+extraButtons);
  newArea.append(newAreaBucket);
  //newArea.disableSelection();
  var existingInCopy = [];
  var leafCount = 0;
  $.each(children, function(){
    var rangeID = $(this).attr("rangeID");
    var leaf = $(this).attr("leaf");
    if($.inArray(rangeID, existingInCopy) == -1){
        existingInCopy.push(rangeID);
        var child = $(this).clone();
        if (admin == "admin"){
            var childID = child.attr('id');
            childID = childID.replace("_tmp", "");
            child.attr('id', childID);
        }
      
      
       
//       if(leaf == "true"){ //put leaves into the bucket.  We need to design a 'ordered' vs 'unordered' tag to check for here since I cannot tell just from the range array whether or not it is ordered. 
//            leafCount += 1;
//            newArea.find('.unassigned').append(child);
//       }
//       else{
//         
//       }
       newArea.find('.notBucket').append(child);
//$('.rangeArrangementArea:first').find('.unassigned').removeClass("selectedSection");
    }
  });
  var leafCountHTML = $("<span class='folioCount'>"+leafCount+"</span>");
  if(admin == "admin"){
     newArea.children(".unassigned").append(leafCountHTML);
  }
  if(outer.find("div[depth='"+intendedDepth+"']").length == 0){ //If the area does not exist, then add it to the arrange tab. 
    outer.append(newArea);
    if(unassigned){
        parentRange.parent().find(".selectedSection").removeClass("selectedSection");
    }
    else{
       parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
    }
    parentRange.addClass("selectedSection");
   
  }
  else{ //if the are already exists
    if(intendedDepth == actualDepth && outer.find("div[depth='"+intendedDepth+"']").attr("relation") !== relation){ //if the area is a child from the same depth...
      var objectArray1 = [];
      $.each(outer.find("div[depth='"+intendedDepth+"']").children('.notBucket').children('.child'),function(){
        objectArray1.push($(this));
      });
      $.each(outer.find("div[depth='"+intendedDepth+"']").children('.unassigned').children('.child'),function(){
        objectArray1.push($(this));
      });     
      var thisDepth = parseInt(intendedDepth) - 1;
      
      var sectionToMoveTo = outer.find("div[depth='"+ thisDepth +"']").find('.selectedSection');
      
      sectionToMoveTo.children('.child').remove();
      for(var y=0; y<objectArray1.length; y++){
        var thisChild1 = objectArray1[y];
        var id1 = thisChild1.attr('id')+"_tmp";
        thisChild1.attr("id", id1);
        sectionToMoveTo.append(thisChild1);
        thisChild1.hide();
      }
      outer.find("div[depth='"+intendedDepth+"']").remove(); //remove the depth and call again to add the new area
      if(unassigned){
          parentRange.parent().find(".selectedSection").removeClass("selectedSection");
      }
      else{
          parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
      }
      toggleChildren(parentRange, admin, event);
      //return false;
    }
    else if (intendedDepth < actualDepth){
      for(var i = actualDepth; i > intendedDepth-2; i--){
        var deepest = outer.find("div[depth='"+i+"']");
        var children = [];
        if(i == intendedDepth - 1){
          parentRange.click();
        }
        else{
          if(deepest.find(".arrangeSection").length == 0){ //a leaf is highlighted in the previous section
            // do nothing
          }
          else if (deepest.children(".notBucket").children(".arrangeSection").length ==0 && deepest.children(".unassigned").length == 1){ //The only thing here is unassigned. 
            if(deepest.children(".selectedSection").length > 0){//unassigned is highlighted.  Click it.
              deepest.find(".selectedSection").click();
            }
            else{ //unassigned is not highlighted, which means we dont have to click it.
              //do nothing
            }

          }
          else if(deepest.children(".unassigned").length == 0){ //these are a collection of unassigned from the next depth
            //THIS CAUSES ERRORS.  
            if(deepest.find(".selectedSection").length > 0){
              console.log("Leaf from unassigned area is highlighted.  Click it.");
              deepest.find(".selectedSection").click();
            }
          }
          else{ //a normal open section.  
            if(deepest.find(".selectedSection").length == 0){
              //do nothing
            }
            else if(deepest.find(".selectedSection").attr("class").indexOf("unassigned") > -1){ //the bucket is highlighted.
              deepest.find(".selectedSection").click();
              //do nothing
            }
            else{// it is an open section.  Click it.
              deepest.find(".selectedSection").click();
            }
          }
        }
      } // end for
    }
    else{ //if the area clicked was the one already highlighted or the admin interface is not necessary
        var objectArray2 = [];
        $.each(outer.find("div[depth='"+intendedDepth+"']").children('.notBucket').children('.child'), function(){
          objectArray2.push($(this));
        });
        $.each(outer.find("div[depth='"+intendedDepth+"']").find('.unassigned').children('.child'), function(){
          objectArray2.push($(this));
        });
        if(parentRange.hasClass("selectedSection")){
            parentRange.removeClass("selectedSection");
            if(unassigned){
                if(admin !== "admin"){
                  parentRange.parent().find(".unassigned").addClass("selectedSection");
                }
            }
            else{
                if(admin !== "admin"){
                   parentRange.parent().parent().find(".unassigned").addClass("selectedSection");
                }
            }
        }
        else{
            if(unassigned){
                parentRange.parent().find(".selectedSection").removeClass("selectedSection");
            }
            else{
               parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
            }
            parentRange.addClass("selectedSection");
        }
     
        $.each(outer.find("div[depth]"),function(){
          if(parseInt($(this).attr("depth")) >= intendedDepth){//remove the depth and the greater ones open.
              $(this).remove();
          }
        });
        parentRange.children('.child').remove();
        for(var x=0; x<objectArray2.length; x++){
          var thisChild2 = $(objectArray2[x]);
          var id2 = thisChild2.attr('id')+"_tmp";
          thisChild2.attr("id", id2);
          parentRange.append(thisChild2);
          thisChild2.hide();
        }
    }
  }
  if(admin === "admin"){
    newArea.children('.notBucket').children('.child').show(); //show sections and leaves
    if(unassigned){ /* Its a special situation if we clicked the bucket of an area.  We want to show the children from the bucket outside of an unassigned object.   */
      var moveUP = newArea.find('.unassigned').children(".child");
      newArea.children('.notBucket').append(moveUP);
      newArea.children('.notBucket').children(".child").show();
      newArea.children(".unassigned").remove();
      newArea.children(".makeSortable").hide();
      newArea.children(".doneSortable").hide();
      newArea.children(".addGroup").hide();
    }
    if(newArea.children('.notBucket').children('.child').length == 0){
      //newAreaBucket.attr("onclick", "");
      if(newArea.children('.unassigned').children('.child').length === 0){
        newArea.children(".notBucket").append('<div style="color: red;">No Subsections Available</div>');
        newAreaBucket.hide();
        if(parentRange.attr("leaf") !== "true" && !unassigned ){
          newArea.children(".addGroup").attr("style", "display: inline-block;");
        }
        else{
          newArea.children(".addGroup").hide();
        }
      }
      else{
        newAreaBucket.show();
      }
      newArea.children(".makeSortable").hide();
      newArea.children(".doneSortable").hide();
      newArea.children(".makeGroup").hide();
    }
    else{
    }
  }
  else{
    newArea.children('.notBucket').children('div').hide();
    newArea.find('input[type="button"]').remove();
    newArea.children('.notBucket').children('div').not('div[leaf="true"]').show(); //only show sections
    //do not show items in the unassigned area
    if(newArea.children('.notBucket').children('div').not('div[leaf="true"]').length == 0){
      newArea.children(".notBucket").append('<div style="color: red;">No Subsections Available</div>');
      newAreaBucket.remove();
      //newAreaBucket.attr("onclick", "");
    }
    else{
      if(newArea.children('.selectedSection').length == 0){
        newArea.children('.unassigned').addClass("selectedSection");
      }
    }    
  } 
}

function dragHelp(event){
    event.dataTransfer.setData("text", event.target.id);
}

function dropHelp(event){
  /* TODO:
   If the target is arrangeSection that is not expanded, it should go into that section.
  if the target is an arrangeSection that is expanded, it should not appear because it should be in that expanded section's bucket.
  if the target is rangeArrangementArea of an expanded arrangeSection, it should go into that section ordered at the end of the ordered pieces.  It can then be sorted from there.  
  Figure out why this runs twice on a drop.
   */
  var targetTag = event.target.tagName;
  var target = undefined;
  console.log("this is the target");
  console.log(event.target);
    if(targetTag == "SPAN" || targetTag.indexOf("INPUT")>-1){
        console.log("Change target");
        var eventParent = event.target.parentNode;
        target = eventParent;
    }
    else{
        target = event.target;
    }
    event.preventDefault();
    var data = "";
    data = event.dataTransfer.getData("text");
    console.log("Drop help called w/ data ========== "+data);

    var areaTakenFrom = $("#"+data).closest(".rangeArrangementArea").attr("rangeID");
    var areaTakenFromDepth = parseInt($("#"+data).closest(".rangeArrangementArea").attr("depth"));
    var relation = target.getAttribute('rangeid');
    var targetClass = target.className;
    
    var areaDroppedTo = $(target).closest(".rangeArrangementArea").attr("rangeID");
    var child = document.getElementById(data);
    console.log("This is the child");
    console.log(child);
    if(child === null || child === undefined) return false;
    if(targetClass.indexOf('notBucket') > -1){
      child.style.display = "block";
      areaDroppedTo = $(target).closest(".rangeArrangementArea").attr("rangeID");
    }
    else{
      child.id = child.id+"_tmp"; 
      child.style.display = "none";
      if(targetClass.indexOf('unassigned') > -1){
          areaDroppedTo = "unassigned";
      }
    }
    var append = true;
    if(target.id === data || target.id === data+"_tmp"){
        console.log("Target is self");
        child.id = child.id.replace("_tmp", "");
        child.style.display = "block";
        append = false;
    }   
    else if(areaDroppedTo == areaTakenFrom){//dont append to self or same section
      if(target.className.indexOf("notBucket") > -1){
        append = false;
      }
    }
    else{
      for (var i = 0; i < target.childNodes.length; i++) {
        if(target.childNodes[i].id+"_tmp" == child.id || target.childNodes[i].id == child.id ) { //prevent dropping into same column or on self
          console.log("child already here");
          append = false;
          child.id = child.id.replace("_tmp", "");
          child.style.display = "block";
        }    
      } 
    }
    if(append){
      child.setAttribute("relation", relation);
      target.appendChild(child);
      child.className = child.className.replace(/\bparent\b/,'');
      if(!child.className.indexOf("child") > -1)child.className = child.className+" child";
    //There has been a change, reset the folio counts.  This resets all, perhaps we could have a smart one that only updates the ones changed. 
      $.each($(".arrangeSection"), function(){
          $(this).children(".folioCount").remove();
            var folioCount = $(this).find("div[leaf='true']").length;
            var folioCountHTML = $("<span class='folioCount'>"+folioCount+"</span>");
            var leafURL = child.getAttribute("rangeID");
            var leafIsInURL = $(child).closest(".rangeArrangementArea").attr("rangeID");
            if($(this).attr("leaf") === "true"){
                folioCountHTML = $("<span onclick=\"existing('"+leafURL+"','"+leafIsInURL+"')\" class='folioCount'><img class='leafIcon' src='http://localhost:8080/brokenBooks/images/leaf.png'/></span>");
            }      
         $(this).append(folioCountHTML);
       });
       if($("div[depth='"+areaTakenFromDepth+"']").children(".notBucket").children(".child").length == 0){
        $("div[depth='"+areaTakenFromDepth+"']").children(".makeSortable").hide();
        $("div[depth='"+areaTakenFromDepth+"']").children(".doneSortable").hide();
         //newArea.children(".addGroup").hide();
      }
      else{
        $("div[depth='"+areaTakenFromDepth+"']").children(".makeSortable").show();
        //$("div[depth='"+areaTakenFromDepth+"']").children(".doneSortable").show();
         //newArea.children(".addGroup").show();
      }
    }
    else{
      event.preventDefault();
      return false;
    }
    
    
    //We would then need to submit the new range order to the datbase via 2 updates: 1 for the range losing a range URI and another for the range gaining a range URI.
}
function dragOverHelp(event){
    event.preventDefault();
}

function gatherRangesForArrange(which){
    var existingRanges = [];
    var uniqueID = 0;
    var rangesMoved = 0;
    var outer = "";
    if(which == 1){
        outer = $(".popoverTrail");
    }
    else if (which == 2){
        outer = $(".adminTrail");
    }
    
    for(var i = rangeCollection.length - 1; i>=0; i--){
        uniqueID += 1;
        var outerRange = rangeCollection[i]; //We have to look at each range, so at some point each range is the outer range...
        var outerRangeLabel = rangeCollection[i].label+" <br>";
        var existingRangeToUpdate = ""; 
        var tag = "parent";
        var relation = "";
        var isLeaf = false;
        var admin = "";
        var isOrdered = ""; //NEED TO DESIGN THIS TAG IN THE OBJECT
        var currentRange = "";
        var dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='true' ondragstart='dragHelp(event);'";
        var dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
        var canvases = rangeCollection[i].canvases.length;
        var checkbox = "<input class='putInGroup' type='checkbox' />";
        var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
        if(rangeCollection[i]["@id"].indexOf("parent_aggr") > -1){ //MUST BE FIRST IN THE RANGES ARRAY
          tag = "parent pAggr";
          outerRangeLabel = "";
        }
        relation = rangeCollection[i]["@id"];
        if(which === 2){
            tag += " sortOrder";
            admin = "admin";
            checkbox = "<input class='putInGroup' type='checkbox' />";
        }
        else{
          dragAttribute = "";
          dropAttribute = "";
          rightClick = "";
          checkbox = "";
        }
        if(canvases!==undefined && canvases !== 0){
          isLeaf = true;
          tag="child";
          dropAttribute = "";
          //checkbox = "";
        }
        else{
          isLeaf = false;
          // dragAttribute = "";
          // dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
        }        
        currentRange = $("<div isOrdred='"+isOrdered+"' "+dropAttribute+" "+dragAttribute+" "+rightClick+" leaf='"+isLeaf+"' onclick=\"toggleChildren($(this), '"+admin+"', event);\" class='arrangeSection "+tag+"' rangeID='"+rangeCollection[i]["@id"]+"'><span>"+outerRangeLabel+"</span> "+checkbox+"  </div>");
        if($.inArray(rangeCollection[i]["@id"], existingRanges) == -1){
          existingRanges.push(rangeCollection[i]["@id"]);
          outer.find(".rangeArrangementArea").find('.notBucket').append(currentRange);
          if(isLeaf){
            allLeaves.push(rangeCollection[i]);
          }
        }
        else{
          //dragAttribute = "id='drag_"+uniqueID+"165.134.241.141' draggable='true' ondragstart='dragHelp(event);'";
          currentRange = outer.find(".arrangeSection[rangeID='"+rangeCollection[i]["@id"]+"']");
        }
        //Create an html range object that can be added
        var innerRanges = rangeCollection[i].ranges;       
        if(innerRanges.length > 0){ //If there are inner ranges
            var tag2 = "child";
            if(which === 2){
                tag2 += " sortOrder";
            }
            for(var j = 0; j<innerRanges.length;j++){ //go over each inner range
                uniqueID += 1;
                dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='true' ondragstart='dragHelp(event);'";
                var thisRange = innerRanges[j];
                $.each(rangeCollection, function(){ //check each range in the collection
                    if(this["@id"] === thisRange){ //find the object by ID among the collection.  When you find it, gets its information.
                        var thisLabel = this.label;
                        var thisCanvases = this.canvases.length;
                        var thisIsOrdered = "";
                        var checkbox2 = "<input class='putInGroup' type='checkbox' />";
                        if(thisCanvases!==undefined && thisCanvases !== 0){
                          isLeaf = true;
                          dropAttribute = "";
                        }
                        else{
                          isLeaf = false;
                          dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
                        }
                        if(which == 1){
                          dropAttribute = "";
                          dragAttribute = "";
                          rightClick = "";
                          checkbox2 = "";
                        }
                        var embedRange = $("<div isOrdred='"+thisIsOrdered+"' "+dragAttribute+" "+dropAttribute+" "+rightClick+" onclick=\"toggleChildren($(this), '"+admin+"', event);\" class='arrangeSection "+tag2+"' leaf='"+isLeaf+"' relation='"+relation+"' rangeID='"+this['@id']+"'><span>"+thisLabel+"</span> "+checkbox2+"</div>"); //Create an html range object for the inner range.
                        if($.inArray(this["@id"], existingRanges) == -1){
                            currentRange.append(embedRange);
                            //$(".rangeArrangementArea").find('.notBucket').append(currentRange);
                            existingRanges.push(embedRange.attr("rangeID"));
                            if(isLeaf){
                              allLeaves.push(this);
                            }
                        }
                        else{
                          rangesMoved += 1;
                          var rangeToMove = outer.find(".arrangeSection[rangeID='"+this["@id"]+"']");
                          currentRange.append(rangeToMove);
                          /* In case of the ranges being wildly out of order, we have to make this check to assure that these children are in fact classed as a child. */
                          rangeToMove.removeClass("parent").addClass("child"); //If we have to embed it, then it is a child.  
                        }
                    } 
                });
            }
        }
        else{ //There are no inner ranges. It could be a section with no children or a leaf.  
        }
    }
    //get leaves into the bucket.  This is just for now.  This makes leaves unordered and I TODO: need to put in an isOrdered tag with these ranges.  
    //var objectsForBucket = outer.find('.rangeArrangementArea').find('.notBucket').children('div[leaf="true"]');
    //objectsForBucket.attr("isordered", "false");
    //$(".unassigned").append(objectsForBucket);
    //Undo the parent aggregator wrapper.
    var pAggrChildren = outer.find('.pAggr').children('div');
    outer.find('.rangeArrangementArea').find('.notBucket').append(pAggrChildren);
    /* In case of the ranges being wildly out of order, we have to make this check to assure the top level nodes are considered parents. */
    pAggrChildren.removeClass("child").addClass("parent");
    $.each(pAggrChildren,function(){
        if($(this).attr("id") !== undefined){
            var newID = $(this).attr("id").replace("_tmp", "");
            $(this).attr("id", newID);
        }
    });
    $('.pAggr').remove();    
    //set folio counts for all sections in the admin interface, ignore leaves.
    if(which == 2){
      $.each(outer.find(".arrangeSection"), function(){
         $(this).children(".folioCount").remove();
            var folioCount = $(this).find("div[leaf='true']").length;
            var folioCountHTML = $("<span class='folioCount'>"+folioCount+"</span>");
            var leafURL = $(this).attr("rangeID");
            if($(this).attr("leaf") === "true"){
                var leafIsInURL = $(this).parent().attr("rangeID");
                folioCountHTML = $("<span onclick=\"existing('"+leafURL+"','"+leafIsInURL+"')\" class='folioCount'><img class='leafIcon' src='http://localhost:8080/brokenBooks/images/leaf.png'/></span>");
            }     
            $(this).append(folioCountHTML);
       });
    }
}

/*
* @params: rangeCollection: an array containing all the ranges of a project.  It is sorted so the array contains ranges from smallest to largest. 
*For now, it is a global array.  It will most likely be handed in as a parameter to the function in the future. 
*Builds the tree structure of ranges from an ordered list of ranges (by size of their ranges[] field).
*/

//Think about sorted vs. unsorted ranges. 
function organizeRanges(){
    var existingRanges = [];
    for(var i = rangeCollection.length - 1; i>=0; i--){
        var outerRange = rangeCollection[i]; //We have to look at each range, so at some point each range is the outer range...
        var outerRangeLabel = rangeCollection[i].label;
        var currentRange = $("<div class='range' rangeID='"+rangeCollection[i]["@id"]+"'><div>"+outerRangeLabel+"</div></div>");        
        if($.inArray(rangeCollection[i]["@id"], existingRanges) == -1){
          existingRanges.push(rangeCollection[i]["@id"]);
          $("#focusedRange").append(currentRange);
        }
        else{
          currentRange = $('div[rangeID="'+rangeCollection[i]["@id"]+'"]'); // get it.
        }
        //Collect the inner ranges for this range.  It will be an array(0) if there are none. 
        var innerRanges = rangeCollection[i].ranges;
        if(innerRanges.length > 0 &&  rangeCollection[i].canvases.length === 0){ //If there are inner ranges
         //console.log("Working inner ranges.")
            for(var j = 0; j<innerRanges.length;j++){ //go over each inner range
                var thisRange = innerRanges[j];
                $.each(rangeCollection, function(){ //check each range in the collection
                    if(this["@id"] === thisRange){ //find the object by ID among the collection.  When you find it, gets its information.
                        var thisLabel = this.label;
                        var embedRange = $("<div class='range' rangeID='"+this['@id']+"'><div>"+thisLabel+"</div></div>"); //Create an html range object for the inner range.
                        if($.inArray(this["@id"], existingRanges) == -1){
                          currentRange.append(embedRange);
                          existingRanges.push(this["@id"]);
                        }
                        else{
                          var rangeToMove = $(".range[rangeID='"+this["@id"]+"']");
                          currentRange.append(rangeToMove);
                        }
                    } //If you didn't find it among the collection, we can't do anything with it.  
                });
            }
        }
        /* This has becoming depricated for BB because we will not be connecting data like this.   */
        // else if(innerRanges.length ===1 &&  rangeCollection[i].canvases.length === 1){
        // //special case.  These ranges are meant to replace canvases of this leaf with fragments of this canvas.  
        // //We have made fragments atomic ranges so that pieces of the same canvas that exist in different ranges can be connected.  
        // //They will exist as their own entity on each individual leaf so that they can have their own annotation, 
        // //but they will be connected by location with the canvas no matter where it exists.  
        // //This code will be reached before the code in the else every time because of the ordered array by range field size.  
        // //Fortunately, there will only be up to two ranges in here.  Those ranges will be URI's of leaves. Therefore, we can directly grab that leaf from the array.  
        // //We can cheat a bit and start from the i we are at since we know it does not come before this one.
        //   var canvasToReplace = rangeCollection[i].canvases[0];
        //   var subStr = canvasToReplace.substring(0,canvasToReplace.indexOf("#xywh"));
        //   for(var x=0; x<i; x++){
        //     //we know there is only one
        //     var innerRangeSubstring = innerRanges[0];
        //     if(innerRanges[0].indexOf("#xywh") > -1) innerRangeSubstring = innerRanges[0].substring(0, innerRanges[0].indexOf("#xywh"));
        //     var leafRangeCanvases= rangeCollection[x].canvases;
        //     if (rangeCollection[x]["@id"] == innerRangeSubstring){
        //       //replace the canvas in the leaf range with the canvas from the inner range
        //         var l = -1;
        //         $.each(leafRangeCanvases, function(){
        //           l++;
        //           if(this == subStr){
        //             rangeCollection[x].canvases[l] = canvasToReplace;
        //           }
        //           else{ //this could be the wrong canvases OR this could be the right canvas as a fragment.  If it is the right canvas as a fragment, there can be multiple fragments of that canvas, so add it in.  Otherwise, we should do nothing.  
        //             if(this.indexOf("#xywh") > -1){
        //               //it could be a fragment
        //               var tmp = this;
        //               if(tmp.indexOf("#xywh") > -1){ //If this is not true, it isn't possible that we are on the correct canvas.
        //                 tmp = tmp.substring(0, tmp.indexOf("#xywh")); //It is at least a fragment, but for the right canvas?  Strip #xyhw=.... off the URI
        //                 tmp += ""; //cast it to a string.
        //                 var tmpCompare = leafRangeCanvases[l].substring(0,leafRangeCanvases[l].indexOf("#xywh")); //Strip #xywh off the canvas we are checking equivalency to
        //                 tmpCompare += ""; // cast to a string
        //                 if(tmpCompare == tmp && $.inArray(canvasToReplace, leafRangeCanvases) < 0){ //Then it was a new fragment for this canvas, so we can push the fragment to this leaf. 
        //                    rangeCollection[x].canvases.splice(l+1, 0, canvasToReplace);
        //                    //place canavs in at appropriate location among canvases in case there are multiple fragments.  This will build them out in the order users think they go.  
        //                 }
        //                 else{
        //                   //it was the wrong canvas.  Leave it alone.
        //                 }  
        //               }
        //             }
        //           }
        //         });
        //     }
        //     //What we have done is skipped further down into the array and altered a single canvas in a leaf. 
        // When we get to that canvas in this function, it will not have any ranges so it will skip to the code below and build out the leaf.
        //   }
        // }
        else{ //There are no inner ranges, so we must be on a leaf or a empty sections. 
            var currentCanvases = outerRange.canvases;
            var firstCanvas = currentCanvases[0];
            if(firstCanvas.indexOf("#xywh") >=0){
              firstCanvas = firstCanvas.substring(0, firstCanvas.indexOf("#xywh"));
            }
            var a = false;
            var rangeForCanvases = $("#focusedRange").find('div[rangeID="'+outerRange['@id']+'"]');
            if(rangeForCanvases.length > 0){ //if the range exists in a section
              a=true;
            }
            else{ //The leaf is a parent to itself, which means its a random page in the bucket. 
               // console.log("This is a new leaf");
              rangeForCanvases = $("<div class='range bucketPage' rangeID='"+outerRange['@id']+"'><div>"+outerRange.label+"</div></div>");
            }
            var canvasHolder1 = $("<div sideA='' class='canvas'> </div>");
            var canvasHolder2 = $("<div sideB='' class='canvas'> </div>");
            var canvasHolder3 = $("<div sideA='' class='canvas'> <img class='canvasImg' src='http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png' /> </div>");
            var canvasHolder4 = $("<div sideB='' class='canvas'> <img class='canvasImg' src='http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png' /> </div>");
            var side1 = true;
            var side2 = false;
            var holderToAppend = $("");
            if(currentCanvases.length > 0){
                $.each(currentCanvases, function(){ //for whatever canvases there are, if any, or many fragments
                  //console.log("Working on canvases");
                  var originalCanvas = String(this);
                  var currentCanvas = "";
                  var fragment = false;
                  var currentCanvasAnnotations = [];
                  var currentCanvasAnnotationsLists = [];
                  var canvasImg = "";
                  if(originalCanvas.indexOf("#xywh") >= 0){
                    currentCanvas = originalCanvas.substring(0, originalCanvas.indexOf("#xywh"));
                    fragment =true;
                  }
                  else{
                    currentCanvas = originalCanvas;
                    fragment = false;
                  }
                  /* Must gather this canvases annotations */
                  $.each(pageCanvases, function(){
                      if(this["@id"] == currentCanvas){
                          currentCanvasAnnotationsLists = this.otherContent;   
                          var canvasLabel = this.label;
                          var canvasID = this["@id"];
                          if(this.images.length > 0){
                              canvasImg = this.images[0].resource["@id"];
                          }
                          else{
                              canvasImg = "http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png";
                          }                         
                          $.each(currentCanvasAnnotationsLists, function(){
                              var annoListID = String(this);
                              $.each(annotationLists, function(){
                                  if(annoListID == this["@id"]){
                                    currentCanvasAnnotations.push(this.resources);
                                  }
                              });
                          });
                          if(currentCanvas == firstCanvas){ //we are still on sideA
                            side1 = true;
                            side2 = false;
                            if(!fragment){
                                canvasHolder3.find('img').attr('src', canvasImg);
                                
                            }
                            canvasHolder3.prepend("<div class='canvasLabel'>"+canvasLabel+"</div>");
                            canvasHolder3.attr("canvasID", canvasID);
                          }
                          else{ //we are on sideB
                            side1=false;
                            side2 = true;
                            if(!fragment){
                                canvasHolder4.find('img').attr('src', canvasImg);
                            }
                            canvasHolder4.prepend("<div class='canvasLabel'>"+canvasLabel+"</div>");
                            canvasHolder4.attr("canvasID", canvasID);
                          }
                      }
                  });
                  
                  var XYWHarray = [0,0,0,0];
                  var XYWHsubstring = originalCanvas.substring(originalCanvas.lastIndexOf('#' + 1)); 
                  if(XYWHsubstring.indexOf('=') > -1){ //string must contain this to be valid
                      var numberArray = XYWHsubstring.substring(originalCanvas.lastIndexOf('xywh=') + 5).split(',');
                      if(numberArray.length === 4){ // string must have all 4 to be valid
                          var x = numberArray[0];
                          var y = numberArray[1];
                          var w = numberArray[2];
                          var h = numberArray[3];
                          XYWHarray = [x,y,w,h];
                      }
                      else{
                        //There is certainly something more useful we can do here. I just kill it if we do not have all the values.  
                        XYWHarray = [0,0,0,0];
                      }
                  }
                  //This part creates chunks and places them in the canvas.
                  if(fragment){
                    var fragmentHTML = $("<div class='fragment canvasinner'><img class='canvasImg' src='"+canvasImg+"' /></div>");
                     $.each(pageCanvases, function(){
                         if(this["@id"] == currentCanvas){
                            if(this.images.length > 0){
                              fragmentHTML.find('img').attr('src', this.images[0].resource["@id"]);
                            }
                            else{
                               fragmentHTML.find('img').attr('src', "http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png"); 
                            }
                             if(XYWHarray[2] == 0 || XYWHarray[3] == 0){ //well surely the height and width are not 0 if it is an image chunk...this is what I do if it is.
                                fragmentHTML.attr("style", "height:"+this.height+"px; width:"+this.width+"px");//set chunk height and width to canvas height and width.
                                fragmentHTML.find("img").attr("style", "top:-"+XYWHarray[1]+"px; left:-"+XYWHarray[0]+"px; ");
                                if(side1){ //put it in side1.  
                                  canvasHolder3.find('img').remove();
                                  canvasHolder3.append(fragmentHTML);
                                }
                                else{ //maybe we should check if side2 is true, but I'll just assume it
                                  canvasHolder4.find('img').remove();
                                  canvasHolder4.append(fragmentHTML);
                                }
                             }
                             else{ //the height and width of the fragment piece were not 0.
                                fragmentHTML.attr("style", "height:"+XYWHarray[3]+"px; width:"+XYWHarray[2]+"px");
                                fragmentHTML.find("img").attr("style", "top:-"+XYWHarray[1]+"px; left:-"+XYWHarray[0]+"px;");
                                if(side1){//put it in side1.
                                  canvasHolder3.append(fragmentHTML);
                                }
                                else{//maybe we should check if side2 is true, but I'll just assume it
                                  canvasHolder4.append(fragmentHTML);
                                }
                             }
                         }
                     });
                  }

                    /*
                          $.each(currentCanvasAnnotationLists, function(data1){ //get each annotationList's annotations
                            console.log("SET Current Canvas ANNOTATIONS");
                             $.get(data1["@id"], function(data2){
                               console.log("ANNOLIST GET");
                                 data=JSON.parse(data2);
                                 currentCanvasAnnotations.push(data2.resources);
                             }, function(data2){ //make that annotations are gathered, then run the code to append annos to their location.
                                var canvas = data2.on;
                                var XYWHarray2 = [0,0,0,0];
                                if(canvas.indexOf("#xywh") >= 0){
                                  var XYWHsubstring = canvas.substring(canvas.lastIndexOf('#' + 1)); 
                                  if(XYWHsubstring.indexOf('=') > -1){ //string must contain data1 to be valid
                                      var numberArray = XYWHsubstring.substring(canvas.lastIndexOf('xywh=') + 5).split(',');
                                      if(numberArray.length === 4){ // string must have all 4 to be valid
                                          var x = numberArray[0];
                                          var y = numberArray[1];
                                          var w = numberArray[2];
                                          var h = numberArray[3];
                                          XYWHarray2 = [x,y,w,h];
                                      }
                                      else{
                                        //There is certainly something more useful we can do here. I just kill it if we do not have all the values.  
                                        XYWHarray2 = [0,0,0,0];
                                      }
                                  }
                                  annotation.attr("style", "left: "+XYWHarray2[0]+"px; top: "+XYWHarray2[1]+"px; width: "+XYWHarray2[2]+"px; height: "+XYWHarray2[3]+"px;"    );
                                }
                                if(data1.resource["@type"] == "dctypes:Image"){
                                  var img = $("<img class='canvasImgFragment' src='"+data1.resource["@id"]+"'/>");
                                  annotation.addClass("imgFragment").append(img);
                                }
                                if(data1.resource["@type"] == "cnt:ContentAsText"){
                                  var text = data1.resource["cnt:chars"];
                                  annotation.attr("annoText", text);
                                }
                                if(side1){
                                  //console.log("Append anno to holder 1");
                                  canvasHolder3.append(annotation);
                                }
                                else{
                                    //console.log("Append anno to holder 2");
                                  canvasHolder4.append(annotation);
                                }
                             }); //Must comment this out when doing local demo.
                            }); //live 
                        */
                            for(var x=0; x<currentCanvasAnnotations.length; x++){
                                var annotation = $("<div class='annotation'></div>");
                                $.each(currentCanvasAnnotations[x], function(){
                                  var canvas = this.on;
                                  var XYWHarray2 = [0,0,0,0];
                                  if(canvas.indexOf("#xywh") >= 0){
                                    var XYWHsubstring = canvas.substring(canvas.lastIndexOf('#' + 1)); 
                                    if(XYWHsubstring.indexOf('=') > -1){ //string must contain this to be valid
                                        var numberArray = XYWHsubstring.substring(canvas.lastIndexOf('xywh=') + 5).split(',');
                                        if(numberArray.length === 4){ // string must have all 4 to be valid
                                            var x = numberArray[0];
                                            var y = numberArray[1];
                                            var w = numberArray[2];
                                            var h = numberArray[3];
                                            XYWHarray2 = [x,y,w,h];
                                        }
                                        else{
                                          //There is certainly something more useful we can do here. I just kill it if we do not have all the values.  
                                          XYWHarray2 = [0,0,0,0];
                                        }
                                    }
                                    annotation.attr("style", "left: "+XYWHarray2[0]+"px; top: "+XYWHarray2[1]+"px; width: "+XYWHarray2[2]+"px; height: "+XYWHarray2[3]+"px;");
                                  }
                                  if(this.resource["@type"] == "dctypes:Image"){
                                    var img = $("<img class='canvasImgFragment' src='"+this.resource["@id"]+"'/>");
                                    annotation.addClass("imgFragment").append(img);
                                  }
                                  if(this.resource["@type"] == "cnt:ContentAsText"){
                                    var text = this.resource["cnt:chars"];
                                    annotation.attr("annoText", text);
                                  }
                                  if(side1){
                                    //console.log("Append anno to holder 1");
                                    canvasHolder3.append(annotation);
                                  }
                                  else{
                                      //console.log("Append anno to holder 2");
                                    canvasHolder4.append(annotation);
                                  }
                                }); //must comment this out when running live
                            }

                           //The canvas holders must be completely built before this part.  We may need to implement a timeout for now.  
                            if(a){ //if the range exists in a section
                               // console.log("Append canvases to range.");
                              rangeForCanvases.append(canvasHolder3, canvasHolder4); //put the canvas object in the range object (the leaf)
                            }
                            else{ //the range does not exist in a section, but rather as a parent range.  Add canvas to the new leaf
                                //console.log("Append canvases to new leaf");
                              rangeForCanvases.append(canvasHolder3, canvasHolder4);
                              $("#focusedRange").append(rangeForCanvases);
                              existingRanges.push(rangeForCanvases.attr("rangeID"));
                            }
                            // if(newLeaf){ //If its a random page from the bucket, it needs to listed as a parent range.  Append to DOM.
                            //   $("#focusedRange").append(newLeaf);
                            //  // console.log("append new leaf to DOM");
                            //   if($.inArray(newLeaf.attr("rangeID"), existingRanges) == -1){
                            //       existingRanges.push(newLeaf.attr("rangeID"));
                            //   }
                            // }
                       });
                }
                else{ // this is an empty section, do nothing, it is already appended.

                }
            }
        }
    }
/*
* Helper function for mergeSort().  It mergest the left and right arrays created when splitting the source array in the middle. 
*/
function merge(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il].ranges.length < right[ir].ranges.length){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}
/*
* The classic merge sort function that sorts an array of numbers from smallest to largest.  In our case, the array is an array of range objects, but what I test is the length of their ranges[] field, since those with the highest count in the ranges[] field will be top parent objects and the ordered array is easier to build the tree structure from.  Even for an array of 1000 ranges, this runs pretty quick.  
*/
function mergeSort(items){
    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle),
        params = merge(mergeSort(left), mergeSort(right));
    
    // Add the arguments to replace everything between 0 and last item in the array
    params.unshift(0, items.length);
    items.splice.apply(items, params);
    return items;
}

function populateAnnoForms(){
        var annos = [];
        console.log("populate anno form");
        if(zeta){
            console.log("For leaf");
            annos = annoListCollection[2].resources;
            console.log(typeof annos + "    1");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos = JSON.parse(annos);
                }
            }
        }
        else if(alpha){
            console.log("for alpha");
            annos = annoListCollection[0].resources;
             console.log(typeof annos + "    2");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos = JSON.parse(annos);
                }
            }
        }
        else{
            console.log("For beta");
            annos = annoListCollection[1].resources;
             console.log(typeof annos + "    3");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos = JSON.parse(annos);
                }
            }
        }
        console.log("annos are");
        console.log(annos);
        $.each($(".contextFormEntry"), function(){
            var label1 = $(this).find('.formLabel').html().replace(":", "").trim();
            var currentEntry1 = $(this).find(".content");
            $.each(annos, function(){
                var checkLabel1 = this.resource.label.replace(":", "").trim();
                if (checkLabel1 == label1){
                    currentEntry1.val(this.resource["cnt:chars"]);
                }
                else if(checkLabel1 == "General Metadata"){
                    $("#notes").val(this.resource["cnt:chars"]);
                }
            });
        });
        $.each($(".contentFormEntry"), function(){
            var label2 = $(this).find('.formLabel').html().replace(":", "").trim();
            var currentEntry2 = $(this).find(".content");
            $.each(annos, function(){
                var checkLabel2 = this.resource.label.replace(":", "").trim();
                if (checkLabel2 == label2){
                    currentEntry2.val(this.resource["cnt:chars"]);
                }
                else if(checkLabel2 == "General Metadata"){
                    $("#notes").val(this.resource["cnt:chars"]);
                }
            });
        });
        $.each($(".carrierFormEntry"), function(){
            var label3 = $(this).find('.formLabel').html().replace(":", "").trim();
            var currentEntry3 = $(this).find(".content");
            $.each(annos, function(){
                var checkLabel3 = this.resource.label.replace(":", "").trim();
                if (checkLabel3 == label3){
                    currentEntry3.val(this.resource["cnt:chars"]);
                }
                else if(checkLabel3 == "General Metadata"){
                    $("#notes").val(this.resource["cnt:chars"]);
                }
            });
        });
        
        
    };
    /*
        Fires when user clicks to enter additional information.  This mainly changes the UI to highlight which part of the leaf the user is working on and show them the information field in the left column.  
    */
   
    function enterCatalogueInfo(canvasID, canvas){
        console.log("cat info");
        var previewImgSrc = $("."+canvas+"Img").attr("src");
        $(".imgPreview").attr("src",previewImgSrc);
        $(".content").val(""); //Reset all fields
            //$(".start").show("explode", "500ms");
            if(canvas == 'recto'){
                $("#folioSide1").addClass("selectedFolio");
                $("#folioSide2").removeClass("selectedFolio");
                $("#oneAndtwo").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');

                $("#catalogueInfoFor").val(canvasID); //alpha
                alpha = true;
                beta= false;
                zeta = false;
            }
            else if (canvas == 'verso'){
                $("#folioSide2").addClass("selectedFolio");;
                $("#folioSide1").removeClass("selectedFolio");
                $("#oneAndtwo").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');

                $("#catalogueInfoFor").val(canvasID); //beta
                beta = true;
                alpha = false;
                zeta = false;
            }
            else{
                $("#oneAndtwo").addClass("selectedFolio");
                $("#folioSide1").removeClass("selectedFolio");
                $("#folioSide2").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');

                $("#catalogueInfoFor").val(currentLeafServerID); //zeta
                alpha = beta = zeta = true;
            }
            console.log("cat info pop anno forms");
            populateAnnoForms();
            // $("#start").attr("onclick", "submitStart('"+canvas+"');");
        
    }
    /*
    When the form information has been filled out, this function will save annotations to the appropriate canvas or leaf range. Entries that create new ranges will do so, and if that range is already created and needs to be updated, it will do that. It also keeps content, context and carrier information separate from each other so we can track them as such.  
*/

    function saveFolio(){
        var currentLeafObject = {};
        var otherInfo = {};
        var uriToSave = $("#catalogueInfoFor").val(); //alpha URI, beta URI, or leaf URI
        var canvasURI = uriToSave;
        var otherInfoList = {};
        $.each(testManifest.structures, function(){
            if ($(this)["@id"] === uriToSave){
                currentLeafObject = $(this); //Set the actual leaf object if the uriToSave is a leaf uri
                return false;
            }
        });
        //Go through each content piece, grab its value and if applicable make it an annotation or a range.
        $(".contentFormEntry").each(function(){
            var addedInfoList1 = {};
            if(zeta){ addedInfoList1 = $("#zetaInformation").find(".contentList"); }
            else if(alpha){ addedInfoList1 = $("#alphaInformation").find(".contentList"); }
            else if(beta){ addedInfoList1 = $("#betaInformation").find(".contentList"); }
            var entryID = $(this).find(".content").attr("id");
            var entryValue = $(this).find(".content").val();
            var range = $(this).find(".content").attr("range");
            range = (range !== undefined && range !== "");
            var addedInfoLabel = $(this).find(".formLabel").html();
            var special = $(this).attr("special");
            var annotationObject = {
                "@id" : "",
                "@type" : "oa:Annotation",
                "motivation" : "sc:painting",
                "label" : "",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" :""
                },
                "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
            };
            var rangeObject = { //this will only be saved 
                "@id" : "",
                "@type" : "sc:Range",
                "motivation" : "sc:painting",
                "label" : "",
                "canvases": [],
                "ranges" : [currentLeafServerID], //This is always the URI of the current leaf, and any new range created because of this leaf MUST contain this leaf URI since a range must include leafs or canvases to make it a range.  
                "resources" : [],
                "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal"
            };
            if (special === "annotations"){
                //console.log("Special Annos");
                var inter = $("#interlinearAnnos").val();
                var marginal = $("#marginalAnnos").val();
                if(inter!==undefined && inter!==""){
                    var annoCopy1 = jQuery.extend({}, annotationObject);
                    annoCopy1["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                    annoCopy1.label = "Interlinear Annotations";
                    annoCopy1.resource["cnt:chars"] = inter;

                    createNewAnno(annoCopy1, "Interlinear Annotations", inter, addedInfoList1);
                    // addedInfoList1.append("<li><span class='formLabel'>Annotations - Interlinear: </span> "+inter+" <span annoServerID='"+annoServerID1+"' class='removeInfo'> X </span></li>");
                }
                if(marginal!==undefined && marginal!==""){
                    var annoCopy2 = jQuery.extend({}, annotationObject);
                    annoCopy2["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                    annoCopy2.label = "Marginal Annotations";
                    annoCopy2.resource["cnt:chars"] = marginal;
                    createNewAnno(annoCopy2, "Marginal Annotations", marginal, addedInfoList1);
                    // addedInfoList1.append("<li local ><span class='formLabel'>Annotations - Marginal: </span>"+marginal+" <span annoServerID='"+annoServerID2+"' class='removeInfo'> X </span></li>");
                }
            }
            else if(entryValue !== undefined && entryValue !== ""){
                var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID; 
                var newRangeURI = "http://www.example.org/iiif/LlangBrev/range/" +rangeID;
                //console.log("Anno Object @ID is being set to :" + newAnnoURI)
                annotationObject["@id"] = newAnnoURI;
                annotationObject.resource["cnt:chars"] = entryValue;
                rangeObject["@id"] = newRangeURI;
                rangeObject.label = entryValue;
                if(range){ //there are no longer any ranges to update.  This code will not run, so it has not been kept up with the rest of the code.  It may be needed in the future if users are allowed to create new ranges or update existing ones through the form.  
                    var updateOrNew = "";
                    var rangeToUpdate = "";
                    for(var i=1; i<testManifest.structures.length; i++){
                        if (testManifest.structures[i].label === entryValue){
                            updateOrNew = "update";
                            rangeToUpdate = testManifest.structures[i]["@id"];
                            updateRange(rangeToUpdate, currentLeafServerID);
                            break;
                        }
                        else{
                            updateOrNew = "new";
                        }
                    }
                    if(updateOrNew === "new"){
                        createNewRange(rangeObject, "", addedInfoLabel, entryValue, addedInfoList1);
                        // addedInfoList1.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+" <span rangeServerID='"+rangeServerID+"' class='removeInfo'> X </span></li>");
                    }
                }
                else{
                    annotationObject["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                    annotationObject.label = addedInfoLabel;
                    annotationObject.resource["cnt:chars"] = entryValue;
                    createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList1);
                    // addedInfoList1.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+"</li><span annoServerID='"+annoServerID+"' class='removeInfo'> X </span>");
                    //There can be multiple annotations of the same label.  We have to allow this to allow for conflicts to be discovered, or allow for the case where it is simply true that the annotation of the same label exists twice with different data in each instance.  For example, one person could make an anntoation saying the author is mozart and another saying the author is davinci, which could be true and therefore must be allowed.  
                }
                //console.log(annotationObject);
            }
        });

        $(".contextFormEntry").each(function(){
            var addedInfoList2 = {};
            //console.log(alpha, beta, zeta);
            if(zeta){ addedInfoList2 = $("#zetaInformation").find(".contextList"); }
            else if(alpha){ addedInfoList2 = $("#alphaInformation").find(".contextList"); }
            else if(beta){ addedInfoList2 = $("#betaInformation").find(".contextList"); }
            //console.log(addedInfoList2);
            var entryID = $(this).find(".content").attr("id");
            var entryValue = $(this).find(".content").val();
            var range = $(this).find(".content").attr("range");
            range = (range !== undefined && range !== "");
            var addedInfoLabel = $(this).find(".formLabel").html();
            //console.log(entryID, entryValue, range, addedInfoLabel);
            var annotationObject = {
                "@id" : "",
                "@type" : "oa:Annotation",
                "motivation" : "sc:painting",
                "label" : "",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" :""
            },
            "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
            };
            var rangeObject = { //this will only be saved 
                "@id" : "",
                "@type" : "sc:Range",
                "motivation" : "sc:painting",
                "label" : "",
                "canvases": [],
                "ranges" : [currentLeafServerID], //This is always the URI of the current leaf, and any new range created because of this leaf MUST contain this leaf URI since a range must include leafs or canvases to make it a range. 
                "resources" : [],
                "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal"
            };
            if(entryValue !== undefined && entryValue !== ""){
                //console.log('HELLO')
                var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID; 
                var newRangeURI = "http://www.example.org/iiif/LlangBrev/range/" +rangeID;
                //console.log("Anno Object @ID is being set to :" + newAnnoURI)
                annotationObject["@id"] = newAnnoURI;
                annotationObject.resource["cnt:chars"] = entryValue;
                rangeObject["@id"] = newRangeURI;
                rangeObject.label = entryValue;
                if(range){ //there are no longer any ranges to update.  This code will not run, so it has not been kept up with the rest of the code.  It may be needed in the future if users are allowed to create new ranges or update existing ones through the form.  
                    //console.log("RANGE")
                    var updateOrNew = "";
                    var rangeToUpdate = "";
                    for(var i=1; i<testManifest.structures.length; i++){
                        if (testManifest.structures[i].label === entryValue){
                            updateOrNew = "update";
                            rangeToUpdate = testManifest.structures[i]["@id"];
                            updateRange(rangeToUpdate, currentLeafServerID);
                            break;
                        }
                        else{
                            updateOrNew = "new";
                        }
                    }
                    if(updateOrNew === "new"){
                        createNewRange(rangeObject, "", addedInfoLabel, entryValue, addedInfoList2);
                        // addedInfoList2.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+" <span rangeServerID='"+rangeServerID+"' class='removeInfo'> X </span></li>");
                    }
                }
                else{
                    //console.log("ANNO")
                    annotationObject["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                    annotationObject.label = addedInfoLabel;
                    annotationObject.resource["cnt:chars"] = entryValue;
                    createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList2);
                    //console.log("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+"</li>");
                    // addedInfoList2.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+" <span annoServerID='"+annoServerID+"' class='removeInfo'> X </span></li>");
                    //There can be multiple annotations of the same label.  We have to allow this to allow for conflicts to be discovered, or allow for the case where it is simply true that the annotation of the same label exists twice with different data in each instance.  For example, one person could make an anntoation saying the author is mozart and another saying the author is davinci, which could be true and therefore must be allowed.  
                }
                //console.log(annotationObject);
            }       
        });

        $(".carrierFormEntry").each(function(){
            var addedInfoList3 = {};
            
            if(zeta){ addedInfoList3 = $("#zetaInformation").find(".carrierList"); }
            else if(alpha){ addedInfoList3 = $("#alphaInformation").find(".carrierList"); }
            else if(beta){ addedInfoList3 = $("#betaInformation").find(".carrierList"); }
            var entryID = $(this).find(".content").attr("id");
            var entryValue = $(this).find(".content").val();
            var range = $(this).find(".content").attr("range");
            range = (range !== undefined && range !== "");
            var addedInfoLabel = $(this).find(".formLabel").html();

            ////console.log("RANGE T/F: "+range);
            
            var special = $(this).attr("special");
            var annotationObject = {
                "@id" : "",
                "@type" : "oa:Annotation",
                "motivation" : "sc:painting",
                "label" : "",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" :""
                },
                "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
            };
            var rangeObject = { //this will only be saved 
                "@id" : "",
                "@type" : "sc:Range",
                "motivation" : "sc:painting",
                "label" : "",
                "canvases": [],
                "ranges" : [currentLeafServerID], //This is always the URI of the current leaf, and any new range created because of this leaf MUST contain this leaf URI since a range must include leafs or canvases to make it a range. .  
                "resources" : [],
                "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal"
            };
            if(special !== undefined && special !== ""){
                //console.log(special);
                if(special === "dimensions"){
                    //console.log("DIMENSIONS")
                    var leafHeight = $("#leafHeight").val();
                    var leafWidth = $("#leafWidth").val();
                    var textHeight = $("#tbHeight").val();
                    var textWidth = $("#tbWidth").val();
                    var lineHeight = $("#lHeight").val();
                    var lineWidth = $("#lWidth").val();
                    if(leafHeight!== "" || leafWidth!==""){
                        //console.log("LEAF IT")
                        var annotationObject1 = jQuery.extend({}, annotationObject); //cannot just do = annotationObject.  It will cause scope issues.
                        var annotationObject2 = jQuery.extend({}, annotationObject);
                        annotationObject1.label = "Leaf Height";
                        annotationObject1.resource["cnt:chars"] = leafHeight;
                        annotationObject2.label = "Leaf Width";
                        annotationObject2.resource["cnt:chars"] = leafWidth;
                        annotationObject1["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        //console.log(annoID);
                        createNewAnno(annotationObject1, "Leaf Height", leafHeight, addedInfoList3); //this will increment annoID by 1
                        //console.log(annoID);
                        annotationObject2["@id"]="http://www.example.org/iiif/LlangBrev/annos/" +(annoID); //should be saving the new annoID # 
                        createNewAnno(annotationObject2, "Leaf Width", leafWidth, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Leaf Height: </span> "+leafHeight+" <span annoServerID='"+annoServerID1+"' class='removeInfo'> X </span></li>");
                        // addedInfoList3.append("<li><span class='formLabel'>Leaf Width: </span> "+leafWidth+" <span annoServerID='"+annoServerID2+"' class='removeInfo'> X </span></li>");
                    }
                    if(textHeight !== "" || textWidth !==""){
                        //console.log("TEXT IT")
                        var annotationObject3 = jQuery.extend({}, annotationObject);
                        var annotationObject4 = jQuery.extend({}, annotationObject);
                        annotationObject3.label = "Text Height";
                        annotationObject3.resource["cnt:chars"] = textHeight;
                        annotationObject4.label = "Text Width";
                        annotationObject4.resource["cnt:chars"] = textWidth;
                        annotationObject3["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        //console.log(annoID);
                        createNewAnno(annotationObject3, "Text Height", textHeight, addedInfoList3); //this will increment annoID by 1
                        //console.log(annoID);
                        annotationObject4["@id"]="http://www.example.org/iiif/LlangBrev/annos/" +(annoID); //should be savind the new annoID # 
                        createNewAnno(annotationObject4, "Text Width", textWidth, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Text Height: </span> "+textHeight+" <span annoServerID='"+annoServerID3+"' class='removeInfo'> X </span></li>");
                        // addedInfoList3.append("<li><span class='formLabel'>Text Width: </span> "+textWidth+" <span annoServerID='"+annoServerID4+"' class='removeInfo'> X </span></li>");
                    }
                    if(lineHeight !== "" || lineWidth !== ""){
                        //console.log("LINE IT");
                        var annotationObject5 = jQuery.extend({}, annotationObject);
                        var annotationObject6 = jQuery.extend({}, annotationObject);
                        annotationObject5.label = "Line Height";
                        annotationObject5.resource["cnt:chars"] = lineHeight;
                        annotationObject6.label = "Line Width";
                        annotationObject6.resource["cnt:chars"] = lineWidth;
                        annotationObject5["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        //console.log(annoID);
                        createNewAnno(annotationObject5, "Line Height", lineHeight, addedInfoList3); //this will increment annoID by 1
                        //console.log(annoID);
                        annotationObject6["@id"]="http://www.example.org/iiif/LlangBrev/annos/" +(annoID); //should be savind the new annoID # 
                        createNewAnno(annotationObject6, "Line Width", lineWidth, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Line Height: </span> "+lineHeight+" <span annoServerID='"+annoServerID5+"' class='removeInfo'> X </span></li>");
                        // addedInfoList3.append("<li><span class='formLabel'>Line Width: </span> "+lineWidth+" <span annoServerID='"+annoServerID6+"' class='removeInfo'> X </span></li>");
                    }
                }
                else if(special === "layout"){
                    //console.log("LAYOUT");
                    var lines = $("#layoutLines").val();
                    var columns = $("#layoutColumns").val();
                    if(lines!==undefined && lines!==""){
                        //console.log("LINES");
                        var annoCopy1 = jQuery.extend({}, annotationObject);;
                        annoCopy1["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        annoCopy1.label = "Lines";
                        annoCopy1.resource["cnt:chars"] = lines;
                        createNewAnno(annoCopy1, "Lines", lines, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Layout - Lines: </span> "+lines+" <span annoServerID='"+annoServerID1+"' class='removeInfo'> X </span></li>");
                    }
                    if(columns!==undefined && columns!==""){
                        //console.log("COLUMNS");
                        var annoCopy2 = jQuery.extend({}, annotationObject);;
                        annoCopy2["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        annoCopy2.label = "Columns";
                        annoCopy2.resource["cnt:chars"] = columns;
                        createNewAnno(annoCopy2, "Columns", columns, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Layout - Columns: </span> "+columns+" <span annoServerID='"+annoServerID2+"' class='removeInfo'> X </span></li>");
                    }
                }
                else if(special === "decorations"){
                    //console.log("DECORATIONS")
                    var initials = $("#carrierInitials").val();
                    var border = $("#carrierBorder").val();
                    if(initials!==undefined && initials!==""){
                        //console.log("INITIALS")
                        var annoCopy1 = jQuery.extend({}, annotationObject);
                        annoCopy1["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        annoCopy1.label = "Initials";
                        annoCopy1.resource["cnt:chars"] = initials;
                        createNewAnno(annoCopy1, "Initials", initials, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Decorations - Initials: </span> "+initials+" <span annoServerID='"+annoServerID1+"' class='removeInfo'> X </span></li>");
                    }
                    if(border!==undefined && border!==""){
                        //console.log("BORDER")
                        var annoCopy2 = jQuery.extend({}, annotationObject);
                        annoCopy2["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        annoCopy2.label = "Border";
                        annoCopy2.resource["cnt:chars"] = border;
                        createNewAnno(annoCopy2, "Border", border, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>Decorations - Border: </span> "+border+" <span annoServerID='"+annoServerID2+"' class='removeInfo'> X </span></li>");
                    }
                }
            }
            else if(entryValue !== undefined && entryValue !== ""){
                var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID; 
                var newRangeURI = "http://www.example.org/iiif/LlangBrev/range/" +rangeID;
                annotationObject["@id"] = newAnnoURI;
                annotationObject.resource["cnt:chars"] = entryValue;
                rangeObject["@id"] = newRangeURI;
                if(range){//there are no longer any ranges to update.  This code will not run, so it has not been kept up with the rest of the code.  It may be needed in the future if users are allowed to create new ranges or update existing ones through the form.  
                    var updateOrNew = "";
                    var rangeToUpdate = "";
                    for(var i=1; i<testManifest.structures.length; i++){
                        if (testManifest.structures[i].label === entryValue){
                            updateOrNew = "update";
                            rangeToUpdate = testManifest.structures[i]["@id"];
                            updateRange(rangeToUpdate, currentLeafServerID);
                            break;
                        }
                        else{
                            updateOrNew = "new";
                        }
                    }
                    if(updateOrNew === "new"){
                        createNewRange(rangeObject, "", addedInfoLabel, entryValue, addedInfoList3);
                        // addedInfoList3.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+"<span rangeServerID='"+rangeServerID2+"' class='removeInfo'> X </span></li>");
                    }
                }
                else{
                    annotationObject["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                    annotationObject.label = addedInfoLabel;
                    annotationObject.resource["cnt:chars"] = entryValue;
                    createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList3);
                    // addedInfoList3.append("<li><span class='formLabel'>"+addedInfoLabel+" </span> "+entryValue+"<span annoServerID='"+annoServerID+"' class='removeInfo'> X </span></li>");
                    //There can be multiple annotations of the same label.  We have to allow this to allow for conflicts to be discovered, or allow for the case where it is simply true that the annotation of the same label exists twice with different data in each instance.  For example, one person could make an anntoation saying the author is mozart and another saying the author is davinci, which could be true and therefore must be allowed.  
                }
            }   
        });

        //Grab the additional notes field and save it as an annotation

        var canvasNotes = $("#notes").val();
        if(canvasNotes !== ""){
            var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID; 
            var canvasURI = $("#catalogueInfoFor").val();
            
            var annoObject = {
                "@id" : newAnnoURI,
                "@type" : "oa:Annotation",
                "motivation" : "sc:painting",
                "label" : "General Metadata",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" : canvasNotes
                },
                "on" : canvasURI
            };
            createNewAnno(annoObject, "General Metadata", canvasNotes, otherInfoList);
            // otherInfoList.append("<li><span class='formLabel'>General Notes: </span> "+canvasNotes+" <span annoServerID='"+annoServerID+"' class='removeInfo'> X </span></li>");
        }

        $(".start").hide("blind", "300ms", function(){
            $(".imgAdditionArea").show("explode", "500ms");
            $("#catalogueInfoFor").val(''); 
            $("#folioSide2").removeClass("selectedFolio");
            $("#folioSide1").removeClass("selectedFolio");
        });

        // if(section !== "bucket"){
        //     console.log("ADD TO SECTION");
        //   updateRange(section, currentLeafServerID);
        // }
       
    }

    function savePlacement(){
        var section = "";
        if($(".selectedSection:last").attr('relation') === 'bucket'){
          section = "bucket";
        }
        else{
          section = $(".selectedSection:last").attr("rangeID");
        }
        if(section !== "bucket"){
          updateRange(section, currentLeafServerID, 'arrange');
        }
    }

    function resetPlacement(){
      $(".selectedSection").removeClass("selectedSection");
      if($(".parentSection").length > 0){
        $.each($(".parentSection"), function(){
          var rangeID = $(this).attr("rangeID");
          $(".arrangeSection[rangeID='"+rangeID+"']").addClass("selectedSection");
        });
      }
      else{
        $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
      }
      $.each($(".rangeArrangementArea"),function(){
        if($(this).find(".selectedSection").length == 0){
          $(this).remove();
        }
      });
    }
    
	function showFullImage(imgContainer){
		var imgToShow = $("#"+imgContainer).find('img').attr("src");
		$("#fullImgContainer").find('img').attr('src', imgToShow);
		$("#fullImgContainer").show();
		$("#fullImageShade").show();
	}
	function hideFullImage(){
		$("#fullImgContainer").hide();
		$("#fullImageShade").hide()
	}
	function addImage(anno, canvasURI){
		//DO not add image annotations into an annotation list. 
		//console.log("CANVASURI: "+canvasURI);
		//console.log(anno);
		//here, the anno is an image annotation.  The object can be directly saved into a canvases 'images[]' field outside of an annotation list.  I have the @id of the canvas and the annotation I want to put into its images[] field.
		//createNewAnno(anno); //live
		//anno["@id"] = annoServerID; //live
		$.each(testManifest.sequences[0].canvases, function(){
			if(this["@id"] === canvasURI){
				this.images.push(anno);
				imageID++;
				//updateCanvas
				return false;
			}
		})
	}

	/*
		Check if this particular annotation already exists.  If it does, we want to update the annotation.  Otherwise, we want to save a new one.
		@see createNewAnno()
	*/
	function annoExists(annoObject){
		var labelToCheckFor = annoObject.label;
		var tmpAnnos = [];
		var theReturn = false;
		var theURI = "";
		if(zeta){
            tmpAnnos = annoListCollection[2];
		}
		else if(alpha){
            tmpAnnos = annoListCollection[0];
		}
		else{
            tmpAnnos = annoListCollection[1];
		}
            $.each(tmpAnnos.resources, function(){
            if(this.label == labelToCheckFor){
	            theReturn = true;
	            return -1;
            }
		});
		return theReturn;
	}

	function updateAnnotation(annoURI, annoObj, arrange){
		var resourceObj = annoObj.resource;
		var updateAnnoURL = "http://localhost:8080/brokenBooks/updateRange";
		var paramObj = {"@id":annoURI, "resource": resourceObj};
		var params = {"content":JSON.stringify(paramObj)};
		$.post(updateAnnoURL, params, function(data){
		});
		if(zeta){
        $.each(annoListCollection[2].resources, function(){
            if(this["@id"] == annoURI){
                    this.resource = annoObj.resource;
            }
        });
		}
		else if (alpha){
      $.each(annoListCollection[0].resources, function(){
          if(this["@id"] == annoURI){
                  this.resource = annoObj.resource;
          }
      });
		}
		else{
        $.each(annoListCollection[1].resources, function(){
            if(this["@id"] == annoURI){
                    this.resource = annoObj.resource;
                    console.log("Local Anno Updated.");
            }
        });
		}
	}

	/*
		This function takes the annotation object and saves it in the manifest object in the appropriate location.  it makes the decision whether the annotation is being saved to a canvas or a range. 
	*/
	function createNewAnno(annoObject, newLabel, value, list){
		// A.K.A update annotationList
		annoID ++;
		var objectID = $("#catalogueInfoFor").val(); //which object are we saving to
		var annoServerID = -1;
		annoObject.on = objectID; //set the on property to be what object we are saving to 
		var newAnnoUrl = "http://localhost:8080/brokenBooks/saveNewRange";
		var params = {'content':JSON.stringify(annoObject)};
		var labelToCheckFor = annoObject.label;
		var tmpAnnos = [];
		var theReturn = undefined;
		var theURI = "";

		/* See if the annotation exists and if so, update the annotation isntead of saving a new one. */
		if(zeta){
			tmpAnnos = annoListCollection[2];
		}
		else if (alpha){
			tmpAnnos = annoListCollection[0];
		}
		else{
			tmpAnnos = annoListCollection[1];
		}
		$.each(tmpAnnos.resources, function(){
			if(this.label == labelToCheckFor){
				updateAnnotation(this["@id"], annoObject);
			}
		});
		if(annoExists(annoObject)){ /* Works with the code block above this.  Check if this annotation exists and if so, we do not want to run any of the code below.  */
			return false;
		}
		$.post(newAnnoUrl, params, function(data){
			data=JSON.parse(data);
			annoObject["@id"] = data["@id"];
			if(zeta){
				annoListCollection[2].resources.push(annoObject); //live
			}
			else if(alpha){
				annoListCollection[0].resources.push(annoObject); //live
			}
			else{
				annoListCollection[1].resources.push(annoObject); //live
			}
			$.each(annoListCollection, function(){
				if (this.on === objectID){ //this is our annotation list to add the annotation to 
					//this.resources.push(annoObject); //push the annotation to the appropriate list.
					// console.log("ANNO ADDED TO THIS LIST "+objectID);
					// console.log(annoObject);
					//Image annotation vs. line annotation?
					var updateAnnoListURL = "http://localhost:8080/brokenBooks/updateRange";
					var newResources = this.resources;
					var updateContent = newResources;
					// console.log("anno list");
					// console.log(this);
					// console.log(this["@id"]);
					var paramsObj = {"@id": this["@id"], "resources":JSON.stringify(updateContent)};
					var params = {"content":JSON.stringify(paramsObj)};
					
					$.post(updateAnnoListURL, params, function(data){
					});
				}
			}); 
				
		});  //live. 
		 
		if(zeta){
			$.each(testManifest.structures, function(){
				if (this["@id"] === objectID){ //this is our canvas object
					var otherContent1 = {"@id":annoListCollection[2]["@id"], "@type":"sc:AnnotationList"};
					var listIncluded = false;
					$.each(this.otherContent,function(){
						if(this["@id"] === annoListCollection[2]["@id"]){
							listIncluded = true;
							return false;
						}
					})
					if(!listIncluded)this.otherContent.push(otherContent1); //If the annotation list is not already included in the otherContent field, add it. 
				}
			});//local. adds the annotation list uri to the other content field.  
		}
		else{
			var annoListID = -1;
			$.each(testManifest.sequences[0].canvases, function(){
				if (this["@id"] === objectID){ //this is our canvas object
					if(alpha){
						annoListID = annoListCollection[0]["@id"];
					}
					else{
						annoListID = annoListCollection[1]["@id"];
					}
					var otherContent2 = {"@id":annoListID, "@type":"sc:AnnotationList"};
					var listIncluded = false;
					$.each(this.otherContent,function(){
						if(this["@id"] === annoListID){
							listIncluded = true;
							return false;
						}
					})
					if(!listIncluded)this.otherContent.push(otherContent2); //If the annotation list is not already included in the otherContent field, add it. 
				}
			});
		}//local
	}

	/*
		Add the range object to the structures array in the manifest object. 
	*/
	function createNewRange(newRangeObject, current, newLabel, value, list){
		rangeID ++;
		//create a new range, given that some new information organizes canvases into a new range.  We will need to make sure the range does not already exist. 
		//testManifest.structures.push(newRangeObject); //local
		var newAnnoUrl = "http://localhost:8080/brokenBooks/saveNewRange";
		var rangeServerID = -1;
		$.post(newAnnoUrl, {'content': JSON.stringify(newRangeObject)}, function(data){
			data=JSON.parse(data);
			newRangeObject["@id"] = data["@id"]; //live
			testManifest.structures.push(newRangeObject); //live
			if(current === 'currentLeaf'){
				currentLeafServerID = data["@id"];
                                
				currentLeaf = currentLeafServerID;
                            $("#oneAndtwo").attr("onclick", "enterCatalogueInfo('leaf')");
			}
			else{
				//list.append("<li><span class='formLabel'>"+newLabel+" </span> "+value+"<span annoServerID='"+data["@id"]+"' class='removeInfo'> X </span></li>");
			}
			
        	var newRangeAnnoList = {
                //"@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
                "@type":"sc:AnnotationList",
                "resources" : [],
                "on" : data["@id"]
        	}
        	var listURL = "http://localhost:8080/brokenBooks/saveNewRange";
        	var listParams = {"content" : JSON.stringify(newRangeAnnoList)};
        	$.post(listURL, listParams, function(data2){
        		data2 = JSON.parse(data2);
                        if(current = "currentLeaf"){
                            annoListCollection[2] = newRangeAnnoList;
                            annoListCollection[2]["@id"] = data;
                        }
                        
        		var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
        		var paramObj = {"@id":currentLeafServerID, "otherContent":[data["@id"]]};
        		var params = {"content":JSON.stringify(paramObj)};
        		$.post(updateCanvasURL, params, function(data){
        		});
        	});
		});
		
	}

  function askForNewTitle(inThisArea){
    var newTitleRequest = 
    $("<div id='newGroupTitleArea'><h1>Create New Group</h1><br>\n\
    <div class='newGroupCenter'>New Group Title<input id='newGroupTitle' type='text'/><div class='noTitleWarning'>You must supply a title to make a group.</div></div>\n\
        <input onclick=\"makeAgroup($('#newGroupTitle').val());\" type='button' value='Submit'/><input onclick=\"$('#newGroupTitleArea').remove();  $('#mainBlockCover').hide();\" type='button' value='Cancel'/>\n\
    </div>");
    $('.adminTrail').append(newTitleRequest);
    $("#mainBlockCover").show();
    theArea = inThisArea;
    
  }

  function makeAgroup(title){
      console.log("MAKE GROUP");
      var leafCount = 0;
        if(title===""){
          $(".noTitleWarning").show();
          setTimeOut($('.noTitleWarning').fadeOut(1000), 2000);
        }
        else{
            console.log("TITLE IS GOOD");
          var childrenForGroup = [];
          $.each(theArea.find("input:checked"), function(){
            childrenForGroup.push($(this).parent());
            var leaves = parseInt($(this).parent().children(".folioCount").html());
            leafCount += leaves;
          });
          var leafCountHTML = $("<span class='folioCount'>"+leafCount+"</span>");
          var uniqueID = $(".arrangeSection").length + 1;
          var depthToCheck = parseInt(theArea.attr("depth")) - 1;
          var inABucket = false;
          var areaForNewGroup = "";
          if($(".adminTrail").find("div[depth='"+depthToCheck+"']").children(".unassigned").hasClass("selectedSection")){
              inABucket = true;
              console.log("From unassigned")
              areaForNewGroup = $(".adminTrail").find("div[depth='"+depthToCheck+"']");
          }
          else{
              console.log("not from unassigned");
                areaForNewGroup = theArea;
          }
          //TODO: create the new range to get its rangeID and, on success, store within the newGroup object.  Toggle children will not work unless the rangeID is an attribute.
            var mockID = "http://www.example.org/iiif/LlangBrev/range/"+$(".arrangeSection").length;
            var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);'";
            var dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
            var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
            var newGroup = $("<div rangeID='"+mockID+"' class='arrangeSection child sortOrder' "+dragAttribute+" "+dropAttribute+" "+rightClick+" leaf='false' onclick=\"toggleChildren($(this),'admin',event);\"><span>"+title+"</span><input class='putInGroup' type='checkbox' /></div>");
            $.each(childrenForGroup, function(){
              var newChild = $(this);
              if(newChild.hasClass("parent")){
                newChild.removeClass("parent").addClass("child");
                newGroup.removeClass("child").addClass("parent");
              }
              newGroup.append($(this));
            });
            newGroup.append(leafCountHTML);
            areaForNewGroup.children(".notBucket").append(newGroup);
            areaForNewGroup.children(".notBucket").children(".arrangeSection").show();
            newGroup.children(".arrangeSection").hide();
            //newGroup.show();
            $('#newGroupTitleArea').remove();
            $("#mainBlockCover").hide();
            areaForNewGroup.children(".selectedSection").click();
        }
        //TODO: createNewRange for the new group, updateRange of range that got the new group.  
    }

  function removeFromSection(leaf, rangeID){
    $.each(testManifest.structures, function(){
      if(this["@id"] === rangeID){
          console.log("found it");
          var index = this.ranges.indexOf(leaf);
          this.ranges.splice(index, 1);
      }
    });
    console.log("Remove section from crumb");
    $(".parentSection").remove();
    $(".selectedSection[rangeID='"+rangeID+"']").click();
    savePlacement();
    //ensure the one clicked is also unselected. 
    if($('.selectedSection').length == 0){ //It is directly in a new section, save the new placement, which will create the bredcumb.
      $(".parentSection").remove();
      $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
    }
    //^^ local

    //Get the ranges of the rangeID we are updating and remove the leaf from it, then update to make this work live!
    // var newAnnoUrl = "http://localhost:8080/brokenBooks/updateRange";
    // var paramObj = {"@id":rangeID, "ranges" : this.ranges};
    // var params = {"content" : JSON.stringify(paramObj)};
    // $.post(newAnnoUrl, params, function(data){
    //     console.log("Remove section from crumb");
    //     $(".parentSection").remove();
    //     $(".selectedSection[rangeID='"+rangeID+"']").click();
    //     savePlacement();
    //     //ensure the one clicked is also unselected. 
    //     if($('.selectedSection').length == 0){ //It is directly in a new section, save the new placement, which will create the bredcumb.
    //       $(".parentSection").remove();
    //       $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
    //     }
    // });
    
  }
	/*
		This range is already in the manifest structures section, so what we are actually trying to do is save this leaf to the already created range.  We must check whether the leaf URI is already in the "ranges" section of the range.  There should be no duplicate URIs. 
	*/
	function updateRange(rangeID, leaf, arrange){
		var currentRange = {};
		$.each(testManifest.structures, function(){
			if(this["@id"] === rangeID){
        var sectionName = this.label;
				if($.inArray(leaf, this.ranges) === -1){
					this.ranges.push(leaf);
          if(arrange == "arrange"){
           $.each($(".selectedSection"), function(){
              var thisRangeID = $(this).attr("rangeID");
              var thisName = $(this).children("span").html();
              if($(this).hasClass("unassigned")){
                //do not add this to the crumb.
              }
              else{
                addedToSection = $("<div rangeID='"+thisRangeID+"' class='parentSection'><div class='parentSectionName'>"+thisName+"</div> <div class='sectionRemove' onclick=\"removeFromSection('"+leaf+"','"+thisRangeID+"');\">X</div></div>");
                $("#arrangeCrumb").append(addedToSection);
              }
            });
          }
				}
				else{
					return false;
				}
			}
		});

    //^^ local

    //To make this work live get the ranges of rangeID, make sure the leaf is not already a part of the ranges, push the leaf to the ranges if not, then update on the server.
    // var newAnnoUrl = "http://localhost:8080/brokenBooks/updateRange";
    // var paramObj = {"@id":rangeID, "ranges" : this.ranges};
    // var params = {"content" : JSON.stringify(paramObj)};
    // $.post(newAnnoUrl, params, function(data){
    //     console.log("Range updated");
    //     var addedToSection = "";
    //     $.each($(".selectedSection"), function(){
    //       var thisRangeID = $(this).attr("rangeID");
    //       var thisName = $(this).children("span").html();
    //       console.log("add section "+thisName+" to arrange crumb.");
    //       if($(this).hasClass("unassigned")){
    //         //do not add this to the crumb.
    //       }
    //       else{
    //         addedToSection = $("<div rangeID='"+thisRangeID+"' class='parentSection'><div class='parentSectionName'>"+thisName+"</div> <div class='sectionRemove' onclick=\"removeFromSection('"+leaf+"','"+thisRangeID+"');\">X</div></div>");
    //         $("#arrangeCrumb").append(addedToSection);
    //       }
    //     });
    // });
	}
	
	function resolveImageURI(rv){
		var uri = $("."+rv+"Canvas").find(".uploadness").find('textarea').val();
	    $.ajax({
	        url: uri,
	        success: function(imageData){
	            //console.log(imageData);
	        },
	        error: function(jqXHR,error, errorThrown) {  
	            alert("Image could not be resolved.  Issue: " +  jqXHR.status + " - " +jqXHR.response);
	        }
	    });
	}

	/*
		Dont save the fields and return to the image options.  
	*/

	function cancelFolio(){
		//Don't get data and return to image page
		$(".start").hide("blind", "300ms", function(){
			$(".imgAdditionArea").show("explode", "500ms");
			$("#catalogueInfoFor").val(''); 
			$("#folioSide2").removeClass("selectedFolio");
			$("#folioSide1").removeClass("selectedFolio");
			alpha = beta = zeta = false;
		});
	}

	/*
		Fired when user clicks "Begin preparing a leaf".  We must create the canvases and the leaf range first, then feed it information as necessary. 
	*/
	function submitIntro(test){
            $(".intro").hide("blind", "300ms", function(){$(".imgAdditionArea").show("explode", "500ms");});
            if(test === "testEdit"){
                return false;
            }
            var newCanvas1ServerID = -1;
            var newCanvas2ServerID = -1;
            annoListCollection = new Array(3);
            //create a new leaf range and get ID.  The leaf range will create 2 canvases whose ID's I will also need.
            canvasID += 1;
            var newCanvas1 = {
                    "@id" : "http://www.example.org/iiif/LlangBrev/canvas/"+canvasID, //local
                "@type" : "sc:Canvas",
                "label" : "Llang_"+canvasID,
                "height" : 1000,
                "width" : 667,
                "images" : [],
                "otherContent": []
            }
   //    	 var newCanvas1AnnoList = {
			// "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
			// "@type":"sc:AnnotationList",
			// "resources" : [],
			// "on" : newCanvas1["@id"]
   //      } //local
        annoListID++;
        //testManifest.sequences[0].canvases.push(newCanvas1);
         $("#folioSide1").attr("onclick","enterCatalogueInfo('http://www.example.org/iiif/LlangBrev/canvases/"+canvasID+"', 'recto');"); //local
      	 $("#folioSide1").attr("canvas","http://www.example.org/iiif/LlangBrev/canvases/"+canvasID); //local
      	 testManifest.sequences[0].canvases.push(newCanvas1); //local
      	 var url = "http://localhost:8080/brokenBooks/saveNewCanvas";
      	 var params1 = {'content': JSON.stringify(newCanvas1)};
      	 $.post(url, params1, function(data){ //save first new canvas
      	 	data = JSON.parse(data);
      	 	newCanvas1["@id"] = data["@id"];
      	 	$("#folioSide1").attr("onclick","enterCatalogueInfo('"+data["@id"]+"', 'recto');"); 
      	 	$("#folioSide1").attr("canvas", data["@id"]); 
                
      	 	testManifest.sequences[0].canvases.push(newCanvas1); //live
 	   	 	
        	//annoListCollection.push(newCanvas1AnnoList);
        	
        	//save anno list for new canvas
        	var newCanvas1AnnoList = {
				//"@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
				"@type":"sc:AnnotationList",
				"resources" : [],
				"on" : data["@id"]
       	 	} //local
                annoListCollection[0] = newCanvas1AnnoList;
        	var listURL1 = "http://localhost:8080/brokenBooks/saveNewRange";
        	var listParams1 = {"content" : JSON.stringify(newCanvas1AnnoList)};
        	$.post(listURL1, listParams1, function(data){ //save first canvas annotation list
        		data = JSON.parse(data);
        		annoListCollection[0]["@id"] = data;
        		//update otherContent of first canvas
        		var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
        		var paramObj = {"@id":newCanvas1["@id"], "otherContent":[data["@id"]]};
        		var params = {"content":JSON.stringify(paramObj)};
        		$.post(updateCanvasURL, params, function(data){
                            $("#folioSide1").click();
        		});
        	});
      	 	newCanvas1ServerID = data["@id"];
  	 		canvasID += 1;
                        
      	 	var newCanvas2 = {
      	 		"@id" : "http://www.example.org/iiif/LlangBrev/canvas/"+canvasID,
		        "@type" : "sc:Canvas",
		        "label" : "Llang_"+canvasID,
		        "height" : 1000,
		        "width" : 667,
		        "images" : [],
		        "otherContent" : []
	      	 };
   	  //    	 	var newCanvas2AnnoList = {
	  //               "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
	  //               "@type":"sc:AnnotationList",
	  //               "resources" : [],
	  //               "on" : newCanvas2["@id"]
	  //       }
			// annoListCollection.push(newCanvas2AnnoList);
			//local
			annoListID++;
                $("#folioSide2").attr("onclick","enterCatalogueInfo('http://www.example.org/iiif/LlangBrev/canvases/"+canvasID+"','verso');");
      	 	$("#folioSide2").attr("canvas","http://www.example.org/iiif/LlangBrev/canvases/"+canvasID);
      	 	//testManifest.sequences[0].canvases.push(newCanvas2); //local
	      	//annoListCollection[1].on = "http://www.example.org/iiif/LlangBrev/canvases/"+canvasID; //local
	      	var params2 = {'content': JSON.stringify(newCanvas2)};
	      	$.post(url, params2, function(data){
	      		data=JSON.parse(data);
	      		newCanvas2ServerID = data["@id"];
                        newCanvas2["@id"] = data["@id"];
      	 		$("#folioSide2").attr("onclick","enterCatalogueInfo('"+data["@id"]+"','verso');");
      	 		$("#folioSide2").attr("canvas", data["@id"]);
      	 		testManifest.sequences[0].canvases.push(newCanvas2); //live
                        var newCanvas2AnnoList = {
	                //"@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
	                "@type":"sc:AnnotationList",
	                "resources" : [],
	                "on" : data["@id"]
	        	};
                        annoListCollection[1] = newCanvas2AnnoList;
				var listURL2 = "http://localhost:8080/brokenBooks/saveNewRange";
	        	var listParams2 = {"content" : JSON.stringify(newCanvas2AnnoList)};
	        	
	        	$.post(listURL2, listParams2, function(data){
	        		data = JSON.parse(data);
	        		annoListCollection[1]["@id"] = data;
	        		var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
	        		var paramObj = {"@id":newCanvas2["@id"], "otherContent":[data["@id"]]};
	        		var params = {"content":JSON.stringify(paramObj)};
	        		$.post(updateCanvasURL, params, function(data){
	        		});
	        	});
	  	 	 	rangeID += 1;
	  	 	 	annoListID += 1;
	            var leafRangeObject = {
	            	"@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
			      	"@type":"sc:Range",
			      	"label":"Llangantock Breviary Page_"+rangeID ,
			      	"canvases" : [
			          //newCanvas1["@id"], //local
			          //newCanvas2["@id"] //local
			          newCanvas1ServerID, //live on dev server
			          newCanvas2ServerID //live on dev server
			      	],
			      	"resources" : [],
			      	"ranges" : [],
		      		"isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
		      		"otherContent" : ""
        		}
				currentLeaf = "http://www.example.org/iiif/LlangBrev/range/"+rangeID; //local
                                
                                
    				createNewRange(leafRangeObject, 'currentLeaf', "", "", "");
                                gatherRangesForArrange(1);
                    });
  	 	});
      	     	
	}

	function removeInfo(listItem){
		var serverID = listItem.attr("annoserverid");
		var url = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
		var paramObj = {"@id" : serverID};
		var params = {"content" : JSON.stringify(paramObj)};
		$.post(url, params, function(data){
			listItem.remove();
		});
	}

	function admin(){
		admin=true; contributer=false;
		$("#whoCreates").html("the project admin.");
		$("#beAdmin").hide();
		$("#beContributer").show();
	}

	function contributer(){
		admin=false; contributer=true;
		$("#whoCreates").html("a contributer.");
		$("#beAdmin").show();
		$("#beContributer").hide();
	}
        
  function updateImageAnno(which){
      if(which === "alpha"){
              var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
              var paramObj = {"@id": $("#folioSide1").attr("canvas"), "images":[$('textarea[rv="recto"]').val()]};
              var params = {"content":JSON.stringify(paramObj)};
              $.post(updateCanvasURL, params, function(data){
              });
      }
      else{
              var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
              var paramObj = {"@id": $("#folioSide2").attr("canvas"), "images":[$('textarea[rv="verso"]').val()]};
              var params = {"content":JSON.stringify(paramObj)};
              $.post(updateCanvasURL, params, function(data){
              });
      }
  }

  function breakUpConfirm(event){
      var tagName = event.target.tagName;
      var className = event.target.className;
      targetToBreak = undefined;
      if(tagName == "SPAN" || tagName == "INPUT" || className.indexOf("folioCount") > -1){
          var parent = event.target.parentNode;
          targetToBreak = parent;
      }
      else{
          targetToBreak = event.target;
      }
      var targetID= targetToBreak.getAttribute("rangeID");
      var confirm = $("<div class='breakConfirm'><span>Break?</span><br>\n\
                      <input value='Yes' type='button' onclick=\"breakUp('"+targetID+"');\" /><input value='No' type='button' onclick='$(this).parent().remove()'/></div>");
      var x = event.pageX;
      var y = event.pageY;
      if($(".breakConfirm").length == 0){
        $('body').append(confirm);
        confirm.css({
          "left" : x+"px",
          "top" : y+"px"
        });
      }
  }

  function breakUp(targetID){
      var group = $(targetToBreak);
      $(".breakConfirm").remove();
      var childrenToBringUp = undefined;
      var depth = -1;
      if(group.attr("leaf") == "true"){
          group.remove();
      }
      else{
          childrenToBringUp = group.children(".child");
          depth = parseInt(group.parent().parent().attr("depth"));
          $.each(childrenToBringUp, function(){
              console.log("moveing child");
              console.log($(this));
              console.log("into");
              console.log($(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket"));
              $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").append($(this));
              $(this).show();
          });
          console.log("children moved.  Remove group.");
          group.remove();
      }
        
  }

  function newGroupForm(column){
      $("#newGroupForm").show();
      $("#mainBlockCover").show();
      var columnDepth = parseInt(column.attr("depth"));
      $("#saveGroupForm").attr("onclick", "saveNewGroupForm("+columnDepth+");");
      if($("#allLeaves").children().length == 0){
          for(var i = 0; i<allLeaves.length; i++){
              var rangeID = allLeaves[i]["@id"];
              var leafLabel = allLeaves[i].label;
              var htmlLeaf = $("<div class='areaLeaf'><input label='"+leafLabel+"' rangeID='"+rangeID+"' class='areaLeafBox' type='checkbox'/>"+leafLabel+"</div>");
              $("#allLeaves").append(htmlLeaf);
          }
      }
      else{
          //do not populate, they are already there
      }
      
  }

  function saveNewGroupForm(depth){
    console.log("Make new group at depth "+depth);
      var uniqueID = $(".adminTrail").find(".arrangeSection").length + 1;
      var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);'";
      var dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
      var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
      var title=$("#groupTitle").val();
      if(title == ""){
          $(".noTitleWarning").show();
          setTimeOut($('.noTitleWarning').fadeOut(1000), 2000);
      }
      else{
          var checkedLeaves = $("#allLeaves").find("input:checked");
          var leafCount = checkedLeaves.length;
          var leafCountHTML = $("<span class='folioCount'>"+leafCount+"</span>");
          var mockID= "http://www.example.org/iiif/LlangBrev/range/"+uniqueID;
          var newGroup = $("<div rangeID='"+mockID+"' leaf='false' class='arrangeSection child sortOrder' "+dragAttribute+" "+dropAttribute+" "+rightClick+" onclick=\"toggleChildren($(this),'admin',event);\"><span>"+title+"</span><input class='putInGroup' type='checkbox' /></div>");
          if(depth ===1){
            newGroup.removeClass("child").addClass("parent");
          }
          $.each(checkedLeaves, function(){
              var leafID = $(this).attr("rangeID");
              var leafLabel = $(this).attr("label");
              $.each(allLeaves, function(){
                  if(this["@id"] == leafID){
                      uniqueID += 1;
                      dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);'";
                      var newLeaf = $("<div rangeID='"+leafID+"' leaf='true' class='arrangeSection child sortOrder' "+dragAttribute+" "+rightClick+" onclick=\"toggleChildren($(this),'admin',event);\"><span>"+leafLabel+"</span><input class='putInGroup' type='checkbox' /></div>");
                      newGroup.append(newLeaf);
                  }
              })
          });
          newGroup.append(leafCountHTML);
          $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").append(newGroup);
          newGroup.show();
          $(".adminTrail").find("div[depth='"+depth+"']").children(".makeSortable").show();
          $(".adminTrail").find("div[depth='"+depth+"']").children(".makeGroup").show();
          if($(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").html() == "No Subsections Available"){
            $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").remove();
          }
          cancelNewGroupForm();
      }
  }

  function cancelNewGroupForm(){
    $("#newGroupForm").find('input[type=checkbox]:checked').removeAttr('checked');
    $("#newGroupForm").hide();
    $("#mainBlockCover").hide();
    $("#groupTitle").val("");
  }

  function existing(leaf, leafIsIn){
        var alphaCanvas = "http://www.example.org/iiif/LlangBrev/canvas/1";
        var betaCanvas = "http://www.example.org/iiif/LlangBrev/canvas/2";
        var alphaImage  = "http://localhost:8080/brokenBooks/images/imgNotFound.png";
        var betaImage = "http://localhost:8080/brokenBooks/images/imgNotFound.png";
        var alphaLabel = "Folio 1 Label"
        var betaLabel = "Folio 2 Label";
        var leafLabel = "Leaf Label";
        //var leaf = "http://165.134.241.141/annotationstore/annotation/554ce6d0e4b0f1c678d2a549";
    if(leaf !== undefined){
        var leafObject = undefined;
        currentLeafServerID = leaf;
        $.each(testManifest.structures, function(){
            //For the demo, you can cheat and not make the calls by making a mock list above and using it.  
            if(this["@id"] == leaf){
                leafObject = this;
                alphaCanvas = this.canvases[0];
                if(this.label !== ""){
                  leafLabel = this.label;
                }
                
                var leafAnnoList = this.otherContent[0]; //anno list URIS
                var alphaAnnoList = [];
                $.each(testManifest.sequences[0].canvases, function(){
                  if(this["@id"] == alphaCanvas){
                    alphaAnnoList = this.otherContent[0];
                    if(this.label !== ""){
                      alphaLabel = this.label;
                    }
                    if(this.images.length > 0){
                      alphaImage = this.images[0].resource["@id"];
                    }
                  }
                });
                betaCanvas = this.canvases[1];
                var betaAnnoList = [];
                $.each(testManifest.sequences[0].canvases, function(){
                  if(this["@id"] == betaCanvas){
                    betaAnnoList = this.otherContent[0];
                    if(this.label!== ""){
                      betaLabel = this.label;
                    }
                    if(this.images.length > 0){
                      betaImage = this.images[0].resource["@id"];
                    }
                  }
                });

                $.each(annotationLists, function(){
                  if(this["@id"] == alphaAnnoList){
                    annoListCollection[0] = this;
                  }
                });
                $.each(annotationLists, function(){
                  if(this["@id"] == betaAnnoList){
                    annoListCollection[1] = this;
                  }
                });
                
                 $.each(annotationLists, function(){
                  if(this["@id"] == leafAnnoList){
                    annoListCollection[2] = this;
                  }
                });
                /*
                $.ajax({
                    "url":alphaAnnoList,
                    success: function(annoList1){
                        annoList1 = JSON.parse(annoList1);
                        annoListCollection[0] = annoList1;
                    }
                }); //live
                var betaAnnoList = betaCanvas.otherContent;
                $.ajax({
                    "url":betaAnnoList,
                    success: function(annoList2){
                        annoList2 = JSON.parse(annoList2);
                        annoListCollection[1] = annoList2;
                    }
                });//live
                var leafAnnoList = this.otherContent; //anno list URIS
                $.ajax({
                    "url":leafAnnoList,
                    success: function(annoList3){
                        annoList3 = JSON.parse(annoList3);
                        annoListCollection[2] = annoList3;
                    }
                });//live
                */
            }
        });       
    }
    else{ //for the tester from the creation intro set of buttons. 
        leafIsIn = "http://www.example.org/iiif/LlangBrev/range/7";
        leaf = "http://www.example.org/iiif/LlangBrev/range/25";
        currentLeafServerID = leaf;
    }
    $("#folioSide1").attr("onclick","enterCatalogueInfo('"+alphaCanvas+"', 'recto');"); 
    $("#folioSide1").attr("canvas", alphaCanvas);
    console.log("alpha image "+alphaImage+".  Beta Image "+betaImage+".");
    $(".rectoImg").attr("src", alphaImage);
    $("#folioSide1").addClass("selectedFolio");
    $("#folioSide2").attr("onclick","enterCatalogueInfo('"+betaCanvas+"', 'verso');"); 
    $("#folioSide2").attr("canvas", betaCanvas);   
    $(".versoImg").attr("src", betaImage);
    $("#oneAndtwo").attr("canvas", leaf);
    $("#oneAndtwo").attr("onclick","enterCatalogueInfo('leaf');"); 
    $("#folio1Label").html(alphaLabel);
    $("#folio2Label").html(betaLabel);
    $("#leafLabel").val(leafLabel);
    $("#oneAndtwoLabel").html(leafLabel);
    $(".leafPopover").show();
    var buttonToClose = $("<div onclick='closeLeafPopover();' class='leafPopClose'>X</div>");
    var arrangeAreaCover = $("<div class='arrangeAreaCover'></div>");
    $(".imgAdditionArea").show();
    if($(".imgAdditionArea").children(".leafPopClose").length == 0){
      $(".imgAdditionArea").append(buttonToClose);
    }
    $("#mainBlockCover").show();
    $("#placement").children("input[type='button']").hide();
    $("#saveMetadata").hide();
    $("#cancelMetadata").hide();
    $(".content").attr("readonly", "readonly");
    $("#placement").children("p:first").html("This area shows where the leaf is positioned in the structure.  This cannot be altered here.  If you want to move your leaf to a new section \n\
      close this and use the drag and drop interface.")
    submitIntro('testEdit');
    alpha = true;
    beta = false;
    zeta = false;
    selectInTree(leafIsIn);
    $("#folioSide1").click();
    $(".popoverTrail").children(".rangeArrangementArea").append(arrangeAreaCover);

}

function closeLeafPopover(){
  $(".popoverTrail").children(".rangeArrangementArea:first").find(".selectedSection").click();
  $(".imgAdditionArea").hide();
  $("#mainBlockCover").hide();
}

function selectInTree(child){
    var depth = $(".popoverTrail").find(".rangeArrangementArea").length;
    var lastArrangeArea = $(".popoverTrail").find('.rangeArrangementArea[depth="'+depth+'"]');
  
    var childToFindParents = lastArrangeArea.find(".arrangeSection[rangeID='"+child+"']");
    var theParent = childToFindParents.parent();
    var control = true;
    if(childToFindParents.length === 0 || childToFindParents.attr("class").indexOf("unassigned") > -1){
        return false;
    }
    if(theParent.attr("class").indexOf("notBucket") > -1 || theParent.attr("class").indexOf('unassigned') > -1 ){
        childToFindParents.click();
        selectInTree(child);
        // childToFindParents.addClass('selectedSection');
        // toggleChildren(childToFindParents, "recurse");
    }
    else{
        while(control == true){
            if(theParent.attr("class").indexOf("notBucket") > -1 || theParent.attr("class").indexOf('unassigned') > -1 ){
                control = false;
            }
            else{
                if(theParent.parent().attr("class") == "notBucket" || theParent.parent().attr("class").indexOf('unassigned') > -1 ){
                    //do nothing
                    control = false;
                }
                else{
                    theParent = theParent.parent();
                }
            }
        }
        recurseID = child;
        theParent.click();
        selectInTree(child);
        // theParent.addClass('selectedSection');
        // toggleChildren(theParent, "recurse");
    }

}