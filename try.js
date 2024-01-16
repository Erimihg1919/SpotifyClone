async function arya(){
    return Promise((resolve,reject)=>{
        addEventListener("loadedmetadata")
    })
}


let a="http://127.0.0.1:5500/music/Anuv%20Jain%20-%20HUSN.mp3"
// undefined
a.split("/music/")
// (2) ['http://127.0.0.1:5500', 'Anuv%20Jain%20-%20HUSN.mp3']
a.split("/music/")[1]
// 'Anuv%20Jain%20-%20HUSN.mp3'
a.split("/music/")[1].replaceAll("%20","")
// 'AnuvJain-HUSN.mp3'
a.split("/music/")[1].replaceAll("%20","").split("-")[0]
// 'AnuvJain'
a.split("/music/")[1].replaceAll("%20","").split("-")[1]
// 'HUSN.mp3'