import whois from "whois";
function getLocation(ip) {
    return new Promise((resolve, reject) => {
        whois.lookup(
            ip,
            (error, data) => {
                if (!error) {
                    let info=data.toLowerCase().split("\n").reduce((a,c)=>{
                        let i=c.split(":");
                        if(i.length !==2)return a;
                        let d=i[1].trim();
                        if(!(i[0] in a)){
                            a[i[0]]=d;
                        return a;
                        }
                        if(a[i[0]] instanceof Array){
                            if(a[i[0]].indexOf(d)==-1)
                            a[i[0]].push(d);
                            return a;
                        }
                        if(a[i[0]]==d)return a;
                        a[i[0]]=[
                            a[i[0]],
                            d
                        ]
                        return a;
                    },{})
                    resolve(info);
                }
                else
                    reject(error);
            }
        )
    })
}
export default getLocation;