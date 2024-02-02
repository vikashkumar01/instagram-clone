package com.example.socialmedia.response;

import com.example.socialmedia.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardData {

    private Long totalNoUser;
    private Long noUserLastMonthRegister;
    private Long noUserLastWeekRegister;
    private Long noUserLastDayRegister;
    private Long totalNoPost;
    private Long noPostLastMonth;
    private Long noPostLastWeek;
    private Long noPostLastDay;
    private Long totalNoComment;
    private Long noCommentLastMonth;
    private Long noCommentLastWeek;
    private Long noCommentLastDay;
    private Long totalReportPost;
    private Long noReportPostLastMonth;
    private Long noReportPostLastWeek;
    private Long noReportPostLastDay;
}
