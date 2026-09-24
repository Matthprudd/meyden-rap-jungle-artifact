export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"POST required"});
  const {email,password}=req.body||{};
  const adminEmail=(process.env.ARTIFACT_ADMIN_EMAIL||"").trim().toLowerCase();
  const adminPassword=process.env.ARTIFACT_ADMIN_PASSWORD||"";
  if(!adminEmail||!adminPassword){
    return res.status(503).json({error:"Admin non configuré"});
  }
  if(String(email||"").trim().toLowerCase()===adminEmail && String(password||"")===adminPassword){
    return res.status(200).json({ok:true,admin:{email:adminEmail,name:"MEYDEN"}});
  }
  return res.status(401).json({error:"Courriel ou mot de passe incorrect"});
}