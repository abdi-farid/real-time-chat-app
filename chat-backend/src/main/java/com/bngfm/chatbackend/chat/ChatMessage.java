package com.bngfm.chatbackend.chat;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
}
