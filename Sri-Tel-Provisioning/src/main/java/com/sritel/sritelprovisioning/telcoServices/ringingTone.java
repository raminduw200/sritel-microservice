package com.sritel.sritelprovisioning.telcoServices;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/telco/ringingTone")
public class ringingTone {

    @PostMapping("/sub/{toneid}")
    public Map<String, Object> subRingTone(@PathVariable String toneid) {
        HashMap response = new HashMap<>();
        if(toneid.equals("1"))
            response.put("message","Subscribed to ringing tone: Take me to church") ;
        else if(toneid.equals("2"))
            response.put("message","Subscribed to ringing tone: Hall of fame") ;
        else if(toneid.equals("3"))
            response.put("message","Subscribed to ringing tone: The greatest") ;
        else
            response.put("message","You did not subscribe to ringing tone") ;

        return response;
    }

    @PostMapping("/unsub/{toneid}")
    public Map<String, Object> unsubRingTone(@PathVariable String toneid) {
        HashMap response = new HashMap<>();
        response.put("message","You have unsubscribed from ringing tone " + toneid);
        return response;
    }
}
