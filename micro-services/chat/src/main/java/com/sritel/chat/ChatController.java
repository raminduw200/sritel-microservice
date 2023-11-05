package com.sritel.chat;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @GetMapping("/messages/{questionId}")
    public List<String> getMessages(@PathVariable Integer questionId) {
        if(questionId == 1) {
            return Arrays.asList("Yes, You can find detailed information about our discounts and special offers on our website or by contacting our sales team." );
        } else if (questionId == 2) {
            return Arrays.asList("Yes, we offer a risk-free trial period for new users. During this time, you can explore our services and features without any charges.");
        } else if (questionId == 3){
            return Arrays.asList("If you experience any technical issues, please reach out to our 24/7 technical support team. You can contact them via live chat, email, or phone.");
        } else if (questionId == 4){
            return Arrays.asList("First log into your account and select the payment option. Follow the given instructions to complete each step");
        } else if (questionId == 5){
            return Arrays.asList("First log in to your account and find \"Payment History\" section. A record of past payments is available there.");
        } else if (questionId == 6){
            return Arrays.asList("Available options include debit cards, credit cards, and online banking.");
        } else if (questionId == 7){
            return Arrays.asList("First go to your account settings. Find the \"Notification Preferences\" section. Customize your notification preferences there by selecting the method as email.");
        } else if (questionId == 8){
            return Arrays.asList("Customer care agents support is available from 7:30 AM to 9:00 PM, Everyday.");
        } else {
            return Arrays.asList("Your question is not clear. Please try again.");
        }
    }

}