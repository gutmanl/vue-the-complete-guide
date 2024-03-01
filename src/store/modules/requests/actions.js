export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-coach-demo-22a3d-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(responseData.message || "Failed submitting request! Error data unavailable!");
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;

        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-coach-demo-22a3d-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);

        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(responseData.message || "Failed to fetch requests! Error message unavailable!");
        }

        if(!responseData) {
            return;
        }

        const requests = Object.entries(responseData).map(([key, element]) => {
            return {
                id: key,
                coachId: coachId,
                userEmail: element.userEmail,
                message: element.message
            }
        });

        context.commit('setRequests', requests);

        
    }
};