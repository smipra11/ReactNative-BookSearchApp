export const snapshottoArray = snapshot => {

    let returnArr = []
    snapshot.forEach((childsnapshot)=> {
        let item = childsnapshot.val()
        item.key = childsnapshot.key
        returnArr.push(item)
        
    });

    return returnArr

}