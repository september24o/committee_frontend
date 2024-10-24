import React, { useState } from 'react';
import { AgendaCard } from './AgendaCard';
import { AgendaItem } from '../types/agenda';

export function MainApp() {
  const [currentAgenda, setCurrentAgenda] = useState<AgendaItem>({
    id: 1,
    title: "2024年第一季度预算审批",
    department: "财务部",
    attendees: ["人力资源部", "运营部", "技术部"],
    startTime: "14:30",
    checkedInDepts: [],
    presenterCheckedIn: false
  });

  const [queuedAgendas, setQueuedAgendas] = useState<AgendaItem[]>([
    {
      id: 2,
      title: "新产品发布计划讨论",
      department: "产品部",
      attendees: ["市场部", "技术部", "销售部"],
      checkedInDepts: [],
      presenterCheckedIn: false
    },
    {
      id: 3,
      title: "员工培训方案评审",
      department: "人力资源部",
      attendees: ["培训部", "各部门主管"],
      checkedInDepts: [],
      presenterCheckedIn: false
    },
    {
      id: 4,
      title: "办公室搬迁方案",
      department: "行政部",
      attendees: ["财务部", "人力资源部"],
      checkedInDepts: [],
      presenterCheckedIn: false
    }
  ]);

  const handleCurrentAgendaCheckIn = (deptName: string) => {
    setCurrentAgenda(prev => ({
      ...prev,
      checkedInDepts: prev.checkedInDepts?.includes(deptName)
        ? prev.checkedInDepts.filter(dept => dept !== deptName)
        : [...(prev.checkedInDepts || []), deptName]
    }));
  };

  const handleCurrentPresenterCheckIn = () => {
    setCurrentAgenda(prev => ({
      ...prev,
      presenterCheckedIn: !prev.presenterCheckedIn
    }));
  };

  const handleQueuedAgendaCheckIn = (agendaId: number, deptName: string) => {
    setQueuedAgendas(prev => prev.map(agenda => {
      if (agenda.id === agendaId) {
        return {
          ...agenda,
          checkedInDepts: agenda.checkedInDepts?.includes(deptName)
            ? agenda.checkedInDepts.filter(dept => dept !== deptName)
            : [...(agenda.checkedInDepts || []), deptName]
        };
      }
      return agenda;
    }));
  };

  const handleQueuedPresenterCheckIn = (agendaId: number) => {
    setQueuedAgendas(prev => prev.map(agenda => {
      if (agenda.id === agendaId) {
        return {
          ...agenda,
          presenterCheckedIn: !agenda.presenterCheckedIn
        };
      }
      return agenda;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">会议议题队列</h1>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              正在讨论
              <span className="ml-2 text-sm text-gray-500">
                (已签到: {(currentAgenda.checkedInDepts?.length || 0) + (currentAgenda.presenterCheckedIn ? 1 : 0)}/{currentAgenda.attendees.length + 1})
              </span>
            </h2>
            <AgendaCard 
              item={currentAgenda} 
              isCurrent={true} 
              onCheckIn={handleCurrentAgendaCheckIn}
              onPresenterCheckIn={handleCurrentPresenterCheckIn}
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2"></div>
              等待讨论
              <span className="ml-2 text-sm text-gray-500">({queuedAgendas.length}个议题)</span>
            </h2>
            <div className="space-y-3">
              {queuedAgendas.map((agenda) => (
                <AgendaCard 
                  key={agenda.id} 
                  item={agenda}
                  onCheckIn={(deptName) => handleQueuedAgendaCheckIn(agenda.id, deptName)}
                  onPresenterCheckIn={() => handleQueuedPresenterCheckIn(agenda.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}