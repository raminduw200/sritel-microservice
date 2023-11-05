package com.sritel.sritelprovisioning.telcoServices;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/telco/dataTopUp")
public class dataTopUp {

    @PostMapping("/sub/{Topupid}")
    public Map<String, Object> subRingTone(@PathVariable String Topupid) {
        HashMap response = new HashMap<>();
        if(Topupid.equals("1"))
            response.put("message","You can purchase a 3GB data top-up valid for one week.") ;
        else if(Topupid.equals("2"))
            response.put("message","You can purchase a 10GB data top-up valid for one month.") ;
        else if(Topupid.equals("3"))
            response.put("message","You can purchase a 30GB data top-up valid for one month.") ;
        else
            response.put("message","You did not subscribe to ant data top up plans yet") ;

        return response;
    }

    @PostMapping("/unsub/{Topupid}")
    public Map<String, Object> unsubRingTone(@PathVariable String Topupid) {
        HashMap response = new HashMap<>();
        response.put("message","You have unsubscribed from data top up plan " + Topupid);
        return response;
    }
}