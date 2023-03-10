import firebase from 'firebase';


const firebaseConfig ={
    apiKey: "AIzaSyA1qtBgLpLt_IVqUY8eH8kFCoNyPv6Fcvk",
    authDomain: "mymobileapplication-4fe1b.firebaseapp.com",
    projectId: "mymobileapplication-4fe1b",
    storageBucket: "mymobileapplication-4fe1b.appspot.com",
    messagingSenderId: "47625760454",
    appId: "1:47625760454:web:0569e4a261ca9b1be731c7"
};

class Fire{
    constructor(callback){
        this.init(callback);  
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
            firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..

        }
        
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error=>{
                        callback(error)
                    });
            }
        
        });
    }
    

    // PHOTO ---------------------------------------------
    

    // LISTS ---------------------------------------------
    

    addList(list){
        let ref = this.ref;
        ref.add(list);
        //console.log("added list");
        //console.log(list);
    } 

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }
    

    // PERSONNEL ---------------------------------
    getPersonnels(callback){
        let ref = this.refPers.orderBy("profession", 'desc');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            personnels = [];

            snapshot.forEach(doc => {
                personnels.push({ id: doc.id, ...doc.data() });
                
            });
            callback(personnels);
        });
    }

    getMedecineSpec(callback){
        let ref = this.refMed.orderBy("short",'desc');
        this.unsubscribe = ref.onSnapshot(snapshot => {
            medecineSpec = [];

            snapshot.forEach(doc => {
                medecineSpec.push({ id: doc.id, ...doc.data() });
                
            });
            callback(medecineSpec);
        });

    }

    getConsultations(callback){
        let ref = this.refCons;
        this.unsubscribe = ref.onSnapshot(snapshot => {
            consultations = [];

            snapshot.forEach(doc => {
                consultations.push({ id: doc.id, ...doc.data() });
                
            });
            callback(consultations);
        });

    }


    getSurgeries(callback){
        let ref = this.refSurg;
        this.unsubscribe = ref.onSnapshot(snapshot => {
            surgeries = [];

            snapshot.forEach(doc => {
                surgeries.push({ id: doc.id, ...doc.data() });
                
            });
            callback(surgeries);
        });

    }

    
    getLists(callback){
        let ref = this.ref;

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            
            

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });

                
            });
            //console.log("these are lists inside FIREBASE");
            //console.log(lists);
            callback(lists);
            
            
        });
    }

    


    addPersonnel(personnel){
        let refPers = this.refPers;
        refPers.add(personnel);
    }
    deleteDoctor(personnel){
        let refPers = this.refPers;
        let refCons = this.refCons;
        refPers.doc(personnel.id).delete();
        var query = refCons.where('doctorID','==', personnel.id);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });
        
    }
    deleteSurg(personnel){
        let refPers = this.refPers;
        let refSurg = this.refSurg;
        refPers.doc(personnel.id).delete();
        var query = refSurg.where('doctorID','==', personnel.id);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });
           
    }
    deleteAide(personnel){
        let refPers = this.refPers;
        let refCons = this.refCons;
        let refTasks = this.refTasks;
        refPers.doc(personnel.id).delete();
        var query = refTasks.where('persID','==', personnel.id);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });
        
    }

    addConsultation(consultation){
        let refCons = this.refCons;
        refCons.add(consultation);
    }
    addSurgery(surgery){
        let refSurg = this.refSurg;
        console.log("here is the details of surgery");
        console.log(surgery);
        refSurg.add(surgery);
    }
    
    // {REQUESTS} ------------------------------

    get userId(){
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("tasks");
    }
    get refPers(){
        return firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("personnels");
    }
    get refMed(){
        return firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("specialities");
    }
    get refCons(){
        return firebase  
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("consultations");
    }
    get refSurg(){
        return firebase  
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("surgeries");
    }
    get refTasks(){
        return firebase  
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("tasks");
    }

    detach(){
        this.unsubscribe();
    }

}

export default Fire;