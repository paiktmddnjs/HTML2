<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CREP Dashboard Clone</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

    <link rel="stylesheet" href="MoneyControll.css" />
</head>
<body>

    <div class="dashboard-container">
        
        <div class="sidebar">
            <div class="logo">CREP</div>
            <nav>
                <ul class="menu-list">
                    <li class="menu-item"><a href="#">메뉴</a></li>
                    <li class="menu-item"><a href="#">대시보드</a></li>
                    <li class="menu-item"><a href="#">일정 관리</a></li>
                    <li class="menu-item"><a href="#">콘텐츠 관리</a></li>
                    <li class="menu-item active"><a href="#">재무 관리</a></li>
                    <li class="menu-item"><a href="#">입/퇴사 관리</a></li>
                    <li class="menu-item"><a href="#">프로젝트 관리</a></li>
                </ul>
            </nav>
            <div class="version-info">
                CREP V-1.0<br>
                1년 크리에이터 ERP
            </div>
        </div>

        <div class="main-content">
            <header class="header">
                <div class="search-bar">
                    <input type="text" placeholder="검색...">
                </div>
                <div class="user-area">
                    <i class="fas fa-search"></i>
                    <i class="fas fa-bell"></i> 
                    <i class="fas fa-cog"></i> 
                    <div class="user-avatar"></div>
                </div>
            </header>

            <div class="dashboard-body">
                <div class="page-header">
                    <div class="action-buttons">
                        <button class="primary-btn">수익 추가</button>
                        <button class="expense-btn">지출 추가</button>
                    </div>
                    <p class="page-title">수익과 지출을 통합 관리하고 순이익을 추적하세요!</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-title"><span>순이익</span><i class="fas fa-chart-line"></i></div>
                        <div class="stat-value">4,020만원</div>
                        <div class="stat-change">+29.7% 전월 대비</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title"><span>총 수익</span><i class="fas fa-arrow-up"></i></div>
                        <div class="stat-value">6,500만원</div>
                        <div class="stat-change">이번 달 총 수익</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title"><span>총 지출</span><i class="fas fa-arrow-down"></i></div>
                        <div class="stat-value">2,480만원</div>
                        <div class="stat-change">이번 달 총 지출</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title"><span>수익률</span><i class="fas fa-dollar-sign"></i></div>
                        <div class="stat-value">61.8%</div>
                        <div class="stat-change">순이익률</div>
                    </div>
                </div>

                <div class="detail-analysis">
                    
                    <div class="left-panel">
                        <div class="tabs">
                            <button>개요</button>
                            <button class="active">수익 분석</button>
                            <button>지출 분석</button>
                            <button>거래 내역</button>
                        </div>

                        <div class="chart-placeholder">
                            <jsp:include page="MoneyBar.jsp" />
                        </div>
                        
                    </div>

                        <div class="right-panel">
                                    <h3>최근 주요 수익</h3>
                            <p style="font-size: 14px; color: #777; margin-bottom: 15px;">수익 금액 TOP 3</p>


                            <div class="recent-revenue-item">
                                <div class="item-source">
                                    <div class="tag-revenue-container">
                                        <span class="tag-revenue">수익</span> 광고 수익
                                    </div>
                                    <span>YouTube 광고 수익</span>
                                </div>
                                <div class="item-amount">+450K</div>
                            </div>

                            <div class="recent-revenue-item">
                                <div class="item-source">
                                    <div class="tag-revenue-container">
                                        <span class="tag-revenue">수익</span> 협찬
                                    </div>
                                    <span>Instagram 협찬</span>
                                </div>
                                <div class="item-amount">+1,500K</div>
                            </div>
                            
                            <div class="recent-revenue-item">
                                <div class="item-source">
                                    <div class="tag-revenue-container">
                                        <span class="tag-revenue">수익</span> 굿즈 판매
                                    </div>
                                    <span>스토어 굿즈 판매</span>
                                </div>
                                <div class="item-amount">+580K</div>
                            </div>
                            
                            
                        </div>
                            </div>
                            
                        </div>
                    </div>
    </div>

</body>
</html>